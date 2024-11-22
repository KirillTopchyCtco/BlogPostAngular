import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { NewMessageDialogComponent } from 'src/app/guest-book/components/new-message-dialog/new-message-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, CommonModule, MatDialogModule, MatSnackBarModule]
})
export class MenuComponent {
  isGuestBookRoute$!: Observable<boolean>;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isGuestBookRoute$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.includes('/guest-book'))
    );
  }

  onGuestBookClick() {
    this.router.navigate(['/guest-book']);
  }
  onPostsClick() {
    this.router.navigate(['/posts']);
  }

  showForm() {

    let dialogRef = this.dialog.open(NewMessageDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar("Message added", "Close")
          .onAction().subscribe(() => {
            this.router.navigate(['/guest-book']);
          })
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
