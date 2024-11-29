import { defineEventHandler, getRequestURL, parseCookies, sendRedirect } from "h3";

const publicPaths = [
  "/login",
  "/register"
];

export default defineEventHandler(async (event) => {
  if (!publicPaths.find((path) => getRequestURL(event).pathname.startsWith(path))) {
    const cookies = parseCookies(event);
    if (!cookies["secret"]) {
      sendRedirect(event, "/login", 401);
    }
  }
});
