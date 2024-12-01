import { Injectable } from '@angular/core';
import cryptoJS from 'crypto-js';
import { PASSWORD_SECRET } from '../consts/password';

@Injectable()
export class LoginService {
  async login(login: string, password: string) {
    const passwordSecret = cryptoJS.AES.encrypt(
      password,
      PASSWORD_SECRET
    ).toString();
    const response = await fetch('/api/v1/authentication/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        login: login,
        password: passwordSecret,
      }),
    });
    if (response.status !== 200) {
      return false;
    }
    return await response.json();
  }

  async logout() {
    await fetch('/api/v1/authentication/logout');
  }
}
