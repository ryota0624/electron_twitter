import { Record } from 'immutable';

const initialMedia = {
  display_url: '',
  expnaded_url: '',
  id_str: '',
  media_url: '',
  type: '',
  url: ''
};

export class MediaModel extends Record(initialMedia) {
  media_url: string;
  getUrl() {
    return this.media_url;
  }
}