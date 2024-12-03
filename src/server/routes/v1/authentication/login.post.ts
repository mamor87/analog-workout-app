import cryptoJS from 'crypto-js';
import { defineEventHandler, readBody, setCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../consts/jwt';
import { COOKIE_KEY } from '../../../consts/cookie';
import { PASSWORD_SECRET } from '../../../consts/password';

const allowedUsers = [
  { name: 'Markus', password: cryptoJS.SHA512('Test123!').toString() },
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const clearPasswordInput = cryptoJS.AES.decrypt(
    body.password,
    PASSWORD_SECRET
  );
  const user = allowedUsers.find(
    (u) =>
      u.name === body.login &&
      u.password === cryptoJS.SHA512(clearPasswordInput).toString()
  );
  if (!user) {
    return '"ERROR_LOGIN_FAIL"';
  }
  const token = jwt.sign({ login: body.login }, JWT_SECRET, {
    expiresIn: '24h',
  });
  setCookie(event, COOKIE_KEY, token);
  return '""';
});
