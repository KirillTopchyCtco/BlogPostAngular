import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../sheared/shared.module';
import { GuestBookComponent } from './components/guest-book/guest-book.component';
import { GuestBookEffects } from './state/guest-book.effects';
import { guestBookReducer } from './state/guest-book.reducer';

const gestBookRoutes: Routes = [
  { path: '', component: GuestBookComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(gestBookRoutes),
    StoreModule.forFeature('guest-book', guestBookReducer),
    EffectsModule.forFeature([GuestBookEffects]),
  ]
})
export class GuestBookModule { }
