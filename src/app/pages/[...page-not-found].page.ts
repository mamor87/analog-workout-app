import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `<h2>Page not Found!</h2>
  <a routerLink="/">Back</a>`,
})
export default class PageNotFoundComponent {}
