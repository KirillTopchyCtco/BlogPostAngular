import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GuestBookService } from './guest-book.service';
import { GuestBookMessage } from './models/guestBookMessage';

describe('GuestBookService', () => {
  let service: GuestBookService;
  let httpMock: HttpTestingController;

  const mockMessages: { [key: string]: GuestBookMessage } = {
    '1': { id: '1', message: 'This is a comment', author: { name: 'John Doe', email: 'john.doe@test.com' } },
    '2': { id: '2', message: 'This is a comment2', author: { name: 'John Doe2', email: 'john.doe2@test.com' } },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GuestBookService]
    });

    service = TestBed.inject(GuestBookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch guest book messages', () => {
    service.getGuestBookMessages().subscribe(messages => {
      expect(messages.length).toBe(2);
      expect(messages).toEqual([
        mockMessages['1'],
        mockMessages['2']
      ]);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessages);
  });

  it('should handle empty response', () => {
    service.getGuestBookMessages().subscribe(messages => {
      expect(messages.length).toBe(0);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });

  it('should handle error response', () => {
    service.getGuestBookMessages().subscribe(
      () => fail('should have failed with the 500 error'),
      (error: any) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should add a guest book message', () => {
    const newMessage: GuestBookMessage = { id: '3', message: 'This is a comment3', author: { name: 'John Doe3', email: 'john.doe3@test.com' } };
    const response = { name: '3' };

    service.addGuestBookMessage(newMessage).subscribe(message => {
      expect(message).toEqual({ ...newMessage, id: '3' });
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should handle error on addGuestBookMessage', () => {
    const newMessage: GuestBookMessage = { id: '3', message: 'This is a comment3', author: { name: 'John Doe3', email: 'john.doe3@test.com' } };

    service.addGuestBookMessage(newMessage).subscribe(
      () => fail('should have failed with the 500 error'),
      (error: any) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });
});
