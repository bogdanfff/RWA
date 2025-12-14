import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';


const hiddenRoutes = ['/settings', '/gameplay', '/store', '/avatarBuilder', '/privacyPolicy'];
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterModule, ScrollingModule, MatTooltipModule, MatExpansionModule, FormsModule, MatButtonModule, CommonModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatListModule, MatIconModule, TranslateModule, MatSelectModule, RouterLink],

  providers: [],
  animations: []
})
export class LayoutComponent {
  isDesktop = true
  loggedIn = true
  canSee = true
  user = { role: 'Administrator', userName: 'bogdn' }
  isOnline = true
  private readonly router = inject(Router)
  menu = menu
  menuLinks: menuLink[] = menu.flatMap(section =>
    section.items
      .filter(item => !!item.link) // safety
      .map(item => ({
        label: item.label,
        link: item.link!
      }))
  );
  $title = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd), 
    map((ev: NavigationEnd) => ev.urlAfterRedirects),
    startWith('/'+this.router.url.split('/').pop()),
    map((ev) => 
      this.menuLinks.filter(val => val.link == ev)[0]?.label
    )
  )
  hasRole(roles?: string[]): boolean {
    return !roles || roles.includes(this.user?.role);
  }

  isVisible(item: MenuItem): boolean {
    return item.canSee !== false;
  }
  logOut() { }
}
interface MenuItem {
  label: string;
  icon?: string;
  link?: string;
  roles?: string[];
  canSee?: boolean;
}

interface MenuSection {
  title: string;
  expanded?: boolean;
  roles?: string[];
  items: MenuItem[];
}
interface menuLink {
  link: string,
  label: string
}

export const menu: MenuSection[] = [
  {
    title: 'Manage',
    expanded: true,
    items: [
      {
        label: 'Assign teams',
        icon: 'swap_horiz',
        link: '/assignTeam',
        roles: ['Admin', 'Manager']
      },
      {
        label: 'Hourly input',
        icon: 'hourglass_empty',
        link: '/hourly',
        roles: ['Admin', 'Manager']
      },
      {
        label: 'Comments',
        icon: 'comment',
        link: '/comments',
        roles: ['Admin', 'Manager']
      },
      {
        label: 'Incident input',
        icon: 'input',
        link: '/incidentInput'
      }
    ]
  },
  {
    title: 'Structure',
    roles: ['Admin', 'Manager'],
    items: [
      {
        label: 'Lines',
        icon: 'swap_horiz',
        link: '/lines',
        canSee: true
      },
      {
        label: 'Segments',
        icon: 'pie_chart',
        link: '/segments',
        canSee: true
      },
      {
        label: 'Teams',
        icon: 'people',
        link: '/teams'
      },
      {
        label: 'Users',
        icon: 'perm_identity',
        link: '/users',
        canSee: true
      }
    ]
  },
  {
    title: 'Home',
    roles: ['Admin', 'Manager'],
    items: [
      {
        label: 'Home',
        icon: 'swap_horiz',
        link: '/home',
        canSee: true
      },
      
    ]
  }
];
