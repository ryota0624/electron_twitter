import { Record } from 'immutable';

const UserDefaultProperty = {
  id: 0,
  id_str: '',
  name: '',
  description: '',
  profile_background_image_url: '',
  profile_image_url: '',
  screen_name: ''
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

export class AdminAccountModel extends Record(AdminDefaultProperty) {
  timeLine: Array<string>;
  id: number;
  id_str: string;
  name: string;
  description: string;
  profile_background_image_url: string;
  profile_image_url: string;
  screen_name: string;
  updateTimeLine(params): AdminAccountModel {
    const concatTimeLine = (bool) => {
      return bool ? [].concat(this.timeLine, params.timeLine)
        .filter((x, i, self) => self.indexOf(x) === i)
        : params.timeLine;
    }
    const updatedTimeLine = concatTimeLine(this.timeLine);
    let newModel = Object.assign({}, this.toJS() , { timeLine: updatedTimeLine });
    const updatedAccount = new AdminAccountModel(newModel)
    return updatedAccount;
  }
}