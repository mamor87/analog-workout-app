import { Component } from '@angular/core';
import { MainLayoutComponent } from '../ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent],
  template: `<main-layout>
    <div slot="header">Header</div>
    <span slot="content">Content</span>
  </main-layout>`,
})
export default class HomeComponent {}
