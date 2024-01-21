import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  title1: any ;
  ngOnInit(): void {
    if ( this.pageUrl()== '/dashboard/account') {
      this.title1 = 'Accounts';
    }
    else if ( this.pageUrl() == '/dashboard/transaction') {
      this.title1 = 'Transactions';
  }
    else if ( this.pageUrl() == '/dashboard/overview') {
      this.title1 = 'Dashboard';
  }
  else if ( this.pageUrl() == '/dashboard/category') {
    this.title1 = 'Categories';
}

  }

  pageUrl(){
    console.log(window.location.pathname);
    return window.location.pathname;

  }
  


}
