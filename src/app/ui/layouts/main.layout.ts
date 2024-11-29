import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule],
  template: `<div class="navbar">
      <ng-content select="[slot=header]"></ng-content>
    </div>
    <div class="content">
      <ng-content select="[slot=content]"></ng-content>
    </div>`,
  styles: `.navbar {
    width: 100%;
    height: 50px;
  }
  .content {
    width: 100%;
    height: calc(100% - 50px);
  }`,
})
export class MainLayoutComponent {}
