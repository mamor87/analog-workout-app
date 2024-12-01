import { Component, inject } from '@angular/core';
import { MainLayoutComponent } from '../ui';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent],
  providers: [LoginService],
  template: `<main-layout>
    <div slot="header">Header <button (click)="logout()">Logout</button></div>
    <span slot="content">Content</span>
  </main-layout>`,
})
export default class HomeComponent {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);

  async logout() {
    await this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
