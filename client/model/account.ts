import { Record } from 'immutable';

const AccountDefaultProperty = {
  id: 0,
  id_str: ''
}

export class AccountModel extends Record(AccountDefaultProperty) {
  id: number;
  id_str: string;
}

const AdminDefaultProperty = Object.assign({}, AccountDefaultProperty, { timeLine: [] });

export class AdminAccountModel extends AccountModel {
  timeLine: Array<string>;
  constructor(args = AdminDefaultProperty) {
    super(args);
    this.timeLine = args.timeLine
  }
  update(params): AdminAccountModel {
    const updatedTimeLine = [].concat(this.timeLine, params.timeLine);
    return new AdminAccountModel(Object.assign({}, this, params, { timeLine: updatedTimeLine }));
  }
}