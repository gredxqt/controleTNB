import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

constructor(private router: Router) {} 
goLogin() {
  this.router.navigate(['/login']);
}

scrollToElement(element:any): void {
  console.log(element);
  element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

}
