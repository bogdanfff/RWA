import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'newKOSUBoard';
  private readonly translate = inject(TranslateService)
  constructor(){
    this.translate.addLangs(['sr-RS','en-US'])
    this.translate.use('sr-RS')
  }
}
