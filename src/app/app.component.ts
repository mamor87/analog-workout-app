import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './ui/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [TranslationService],
  template: `<router-outlet />`,
})
export class AppComponent {
  private readonly translationService = inject(TranslationService);

  constructor() {
    afterNextRender(() => {
      this.translationService.load(`/api/v1/translations/${navigator.language ?? 'en'}`).then();
    });
  }
}
