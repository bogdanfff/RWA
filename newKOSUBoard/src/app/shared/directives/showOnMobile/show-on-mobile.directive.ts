import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size/screen-size.service';

@Directive({
  selector: '[appShowOnMobile]',
  standalone: true
})
export class ShowOnMobileDirective {

  private readonly screenSizeSrv = inject(ScreenSizeService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);

  @Input('appShowOnMobile') showOnMobile!: boolean;

  
  ngOnInit() {

    this.screenSizeSrv.isDesktop.subscribe(isDesktop => {

      this.viewContainer.clear();

      if ((this.showOnMobile && !isDesktop) || (!this.showOnMobile && isDesktop)) {

        this.viewContainer.createEmbeddedView(this.templateRef);

      }

    });

  }

}
