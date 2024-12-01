import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  HIDE_COMMAND_ICON_BUTTON,
  InputComponent,
  InputIcon,
  LoginLayoutComponent,
} from '../ui/index';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LoginLayoutComponent,
    InputComponent,
  ],
  providers: [LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<!-- prettier-ignore -->
    <login-layout>
    <mat-card appearance="outlined">
      <mat-card-content>
        <ui-input
          id="login"
          label="Anmeldung"
          [(value)]="form.login.value" />
        <ui-input
          id="password"
          label="Passwort"
          [(value)]="form.password.value"
          [hideInput]="passwordHidden()"
          [iconsEnd]="passwordCommands()"
        />
        <button mat-button (click)="login()">Anmelden</button>
        @if (loginError) {
          <mat-error>{{loginError}}</mat-error>
        }
      </mat-card-content>
    </mat-card>
  </login-layout>`,
})
export default class LoginComponent {
  private readonly changeDetection = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  loginError = '';
  form = {
    login: {
      value: '',
    },
    password: {
      value: '',
    },
  };
  passwordHidden = signal(true);
  passwordCommands = signal<InputIcon[]>([
    { name: HIDE_COMMAND_ICON_BUTTON, isButton: true },
  ]);

  async login() {
    const loginError = await this.loginService.login(
      this.form.login.value,
      this.form.password.value
    );
    if (!loginError) {
      this.router.navigateByUrl('/');
      return;
    }
    this.loginError = loginError;
    this.changeDetection.markForCheck();
  }
}
