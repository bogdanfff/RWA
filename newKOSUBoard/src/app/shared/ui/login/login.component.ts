import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-login',
    template: '<router-outlet style="width: 100%;"></router-outlet>',
    imports: [
        RouterOutlet
    ]
})
export class LoginComponent {

}
