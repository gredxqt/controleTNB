import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Account } from '../entitiy/Account';
import { AccountService } from '../service/account.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  accounts!: Account[];
  header = 'New Account';
  constructor(private httpservice: AccountService) {}

  ngOnInit() {
    this.httpservice.allAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  saveAccount() {
    console.log('saveAccount');
    console.log(this.account);
    this.httpservice.addAccount(this.account).subscribe((data) => {
      this.accounts.push(data);
    });
    this.visible = false;
    this.visible2 = false;
  }
  hideDialog() {
    this.visible = false;
    this.visible2 = false;
    this.visible3 = false;
  }
  visible: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  deletedId!: number;
  account = {
    id: 0,
    name: '',
    balance: 0,
  };
  showDialog() {
    this.visible = true;

    this.account = {
      id: 0,
      name: '',
      balance: 0,
    };
  }
  showUpdateDialog(acc: Account) {
    this.visible2 = true;
    this.account.id = acc.id;
    this.account.name = acc.name;
    this.account.balance = acc.balance;
  }
  showDeleteDialog(id: number) {
    this.visible3 = true;
    this.deletedId = id;
  }
  deleteAccount() {
    console.log('deleteAccount');
    this.httpservice.deleteAccount(this.deletedId).subscribe(
      (data) => {
        this.accounts = this.accounts.filter((a) => a.id != this.deletedId);
      },
      (error) => {
        console.log('Error deleting account:', error);
      },
    );
    this.visible3 = false;
  }
  updateAccount() {
    console.log(this.account);
    this.httpservice.updateAccount(this.account).subscribe((data) => {
      this.accounts.forEach((a) => {
        if (a.id == data.id) {
          a.name = data.name;
          a.balance = data.balance;
        }
      });
    });
    this.visible = false;
    this.visible2 = false;
  }

  clear(_t10: Table) {
    throw new Error('Method not implemented.');
  }
}
