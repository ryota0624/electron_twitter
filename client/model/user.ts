import { Record } from 'immutable';

const UserDefaultProperty = {
  id: 0,
  id_str: ''
}

export class UserModel extends Record(UserDefaultProperty) {
  id: number;
  id_str: string;
  name: string;
  description: string;
  profile_background_image_url: string;
  profile_image_url: string;
  screen_name: string;
}

const AdminDefaultProperty = Object.assign({}, UserDefaultProperty, { timeLine: [] });

export class AdminAccountModel extends UserModel {
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