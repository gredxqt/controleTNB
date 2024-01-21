import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Account } from '../entitiy/Account';
import { AccountService } from '../service/account.service';
import { Category } from '../entitiy/Category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss',
})
export class CategoryPageComponent {
  categories!: Category[];
  color: string = '';
  constructor(private httpservice: CategoryService) {}

  ngOnInit() {
    this.httpservice.allCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  saveAccount() {
    throw new Error('Method not implemented.');
  }
  hideDialog() {
    throw new Error('Method not implemented.');
  }
  visible: boolean = false;
  account = {
    id: 1,
    name: 'John Doe',
    category: 'Business',
    balance: '$3,200.00',
  };
  showDialog() {
    this.visible = true;
  }
  deleteAccount(arg0: any) {
    throw new Error('Method not implemented.');
  }
  updateAccount(_t30: any) {
    throw new Error('Method not implemented.');
  }
  addNewAccount() {
    throw new Error('Method not implemented.');
  }
  clear(_t10: Table) {
    throw new Error('Method not implemented.');
  }
  onColorChange(category: Category, event: any) {
    category.color = event.value;
  }
}
