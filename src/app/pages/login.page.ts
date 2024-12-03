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
import { TranslationService } from '../ui/services/translation.service';
import { TranslatePipe } from '../ui/pipes/translate.pipe';

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
    TranslatePipe,
  ],
  providers: [TranslationService, LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<!-- prettier-ignore -->
    <login-layout>
    <mat-card appearance="outlined">
      <mat-card-content>
        <ui-input
          id="login"
          [label]="'LOGIN' | translate"
          [(value)]="form.login.value" />
        <ui-input
          id="password"
          [label]="'PASSWORD' | translate"
          [(value)]="form.password.value"
          [hideInput]="passwordHidden()"
          [iconsEnd]="passwordCommands()"
        />
        <button mat-button (click)="login()">{{'DO_LOGIN' | translate}}</button>
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
  private readonly translationService = inject(TranslationService);

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
    this.loginError = this.translationService.get(loginError);
    this.changeDetection.markForCheck();
  }
}
