import { defineEventHandler, deleteCookie, sendRedirect } from 'h3';
import { COOKIE_KEY } from '../../../consts/cookie';

export default defineEventHandler((event) => {
  deleteCookie(event, COOKIE_KEY);
});
