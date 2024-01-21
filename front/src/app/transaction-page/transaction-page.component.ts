import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Transaction } from '../entitiy/Transaction';
import { Category } from '../entitiy/Category';
import { Account } from '../entitiy/Account';
import { TransactionService } from '../service/transaction.service';
import { CategoryService } from '../service/category.service';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.scss',
})
export class TransactionPageComponent {
  transactions!: Transaction[];
  categories!: Category[];
  accounts!: Account[];

  checked: boolean = false;
  checked2: boolean = false;
  categoryDropdown!: any[];
  accountDropdown!: any[];
  transactionObject!: Transaction;
  constructor(
    private httpTransactionService: TransactionService,
    private httpCategoryService: CategoryService,
    private httpAccountService: AccountService,
  ) {}
  ngOnInit() {
    this.httpTransactionService.allTransactions().subscribe((data) => {
      this.transactions = data;
    });
    this.httpCategoryService.allCategories().subscribe((data) => {
      this.categories = data;
      this.categoryDropdown = this.categories.map((category) => category);
      console.log(this.categoryDropdown);
    });
    this.httpAccountService.allAccounts().subscribe((data) => {
      this.accounts = data;
      this.accountDropdown = this.accounts.map((account) => account);
    });
    console.log('fshd');
  }
  account = {
    id: 0,
    name: '',
    balance: 0,
  };
  date: any;
  visible2!: boolean;
  saveAccount() {
    console.log(this.checked);
    console.log(this.checked2);
    console.log(this.transaction);
    this.httpTransactionService
      .addTransaction(this.transaction)
      .subscribe((data) => {
        console.log(data);
        console.log(this.transaction);
        data.date = new Date(data.date);
        data.account = this.transaction.account;
        data.type = this.checked;
        this.transactions.push(data);
      });
  }
  hideDialog() {
    this.visible = false;
    this.visible2 = false;
  }
  visible: boolean = false;

  transaction = {
    id: 0,
    amount: 5,
    category: new Category(1, '', ''),
    account: new Account(1, '', 0),
    date: new Date(),
    type: false,
  };
  showDialog() {
    this.visible = true;
    this.transaction = {
      id: 0,
      amount: 0,
      category: new Category(0, '', ''),
      account: new Account(0, '', 0),
      date: new Date(),
      type: false,
    };
  }
  showUpdateDialog(trans : Transaction) {
    this.visible2 = true;
    this.transaction.id = trans.id;
    this.transaction.account =  trans.account;
    this.transaction.amount = trans.amount;
    this.transaction.category = trans.category;
    this.transaction.type = trans.type;
    this.transaction.date = trans.date;

  }
  deleteAccount(arg: Transaction) {
    this.httpTransactionService.deleteTransaction(arg).subscribe((data) => {
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== arg.id,
      );
    });
  }
  updateAccount() {
    console.log("azeaze89a-98a-9z8e-a9z8e-az98");
    this.httpTransactionService.updateTransaction(this.transaction).subscribe(
      (data) => {
        this.transactions = this.transactions.filter(
          (transaction) => transaction.id !== this.transaction.id,
        );
        this.transactions.push(data);
        
      },
      (error) => {
        console.log(error);
      },
    ); // TO TEST
    window.location.reload();
  }
  addNewAccount() {
    throw new Error('Method not implemented.');
  }
  clear(_t10: Table) {
    throw new Error('Method not implemented.');
  }

  isChecked() {
    if (this.checked == true) {
      this.checked = false;
    } else {
      this.checked = true;
    }
  }
  isChecked2() {
    if (this.checked2 == true) {
      this.checked2 = false;
    } else {
      this.checked2 = true;
    }
  }
}
