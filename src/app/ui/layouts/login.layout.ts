import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: 'login-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule],
  template: `<mat-grid-list cols="3" rowHeight="100%">
    <mat-grid-tile></mat-grid-tile>
    <mat-grid-tile>
      <ng-content></ng-content>
    </mat-grid-tile>
    <mat-grid-tile></mat-grid-tile>
  </mat-grid-list>`,
})
export class LoginLayoutComponent {}
