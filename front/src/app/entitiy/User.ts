import { Account } from './Account';
import { Setting } from './Setting';

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public amount: number,
    public dateSalary: Date,
    public salary: number,
    public accounts: Account[],
    public setting?: Setting,
  ) {}
}
