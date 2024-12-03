import {
  defineEventHandler,
  getRequestURL,
  parseCookies,
  sendRedirect,
} from 'h3';
import { COOKIE_KEY } from '../consts/cookie';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../consts/jwt';

const publicPaths = [
  '/login',
  '/v1/authentication/login',
  '/register',
  '/v1/translations/de',
  '/v1/translations/en',
];

export default defineEventHandler(async (event) => {
  if (
    !publicPaths.find((path) => getRequestURL(event).pathname.startsWith(path))
  ) {
    console.info(getRequestURL(event).pathname);
    const cookies = parseCookies(event);
    try {
      if (!jwt.verify(cookies[COOKIE_KEY], JWT_SECRET)) {
        sendRedirect(event, '/login', 401);
      }
    } catch {
      sendRedirect(event, '/login', 401);
    }
  }
});
