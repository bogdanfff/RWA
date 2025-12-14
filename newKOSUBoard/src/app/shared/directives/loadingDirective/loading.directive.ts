import { Component, ComponentFactory, ComponentRef, Directive, Inject, inject, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size/screen-size.service';
import { LoadingService } from '../../services/loadingService/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective {

  private readonly loadingService = inject(LoadingService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);
  private loadingComponentRef?: ComponentRef<LoadingComponent>;

  loadingComponent! : ComponentRef<LoadingComponent>;
  
  ngOnInit() {
    

    this.loadingService.loadingSub.subscribe(showLoading=>{
      this.viewContainer.clear();
      if(showLoading){
        this.loadingComponentRef = this.viewContainer.createComponent(LoadingComponent);
        // console.log('shouldBeoading');
        
      }else{
        this.viewContainer.createEmbeddedView(this.templateRef);
        // console.log('shouldNotBeoading');
      }
    })

  }

}
@Component({
  selector: 'loading-spinner',
  standalone: true,
  template: `
    <div style="display:flex;justify-content:center;padding:20px;height:300px;align-items:center">
        <mat-progress-spinner color="primary" mode="indeterminate">
        </mat-progress-spinner>
      </div>
  `,
  imports: [MatProgressSpinnerModule],
})
export class LoadingComponent {
  constructor() {}
}
