import { Account } from './Account';
import { Category } from './Category';

export class Transaction {
  constructor(
    public id: number,
    public amount: number,
    public type: boolean,
    public date: Date,
    public account: Account,
    public category: Category,
  ) {}
}
