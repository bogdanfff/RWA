import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Router
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// Angular CDK
import { ScrollingModule } from '@angular/cdk/scrolling';

// Angular Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

// ngx-translate
import { TranslateModule } from '@ngx-translate/core';

// Custom directiv
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
}