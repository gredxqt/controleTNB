import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  sidebarVisible: boolean = true;
  title!: string ;

updateTitle(link: string) {
  this.title = link;
  console.log(this.title);
}

}
