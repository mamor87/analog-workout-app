import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<!-- prettier-ignore -->
    <login-layout>
    <mat-card appearance="outlined">
      <mat-card-content>
        {{form.login.value}}
        <ui-input
          id="login"
          label="Anmeldung"
          [(value)]="form.login.value"
          [validator]="form.login.validator" />
        <ui-input
          id="password"
          label="Passwort"
          [(value)]="form.password.value"
          [hideInput]="passwordHidden()"
          [iconsEnd]="passwordCommands()"
        />
        <button mat-button (click)="login()">Anmelden</button>
      </mat-card-content>
    </mat-card>
  </login-layout>`,
})
export default class LoginComponent {
  form = {
    login: {
      value: '',
      validator: (control: AbstractControl): ValidationErrors | null => {
        if (control.value === 'Markus') {
          console.info('invalid', control);
          return {
            login: 'Markus ist nicht erlaubt!',
          };
        }
        return null;
      },
    },
    password: {
      value: '',
    },
  };
  passwordHidden = signal(true);
  passwordCommands = signal<InputIcon[]>([
    { name: HIDE_COMMAND_ICON_BUTTON, isButton: true },
  ]);

  login() {
    console.info('login with: ', this.form);
  }
}
