import { AccountDetail } from './account-detail';

export class Account {
    customerId: number;
    accountDate: Date;
    accountDetails: Array<AccountDetail>;
}
