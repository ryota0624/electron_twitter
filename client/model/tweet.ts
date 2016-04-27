
import { Record } from 'immutable';

const initialModel = {
  created_at: "",
  id: 0,
  id_str: '',
  text: '',
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user: {
    id: 0,
    id_str: '',
    screen_name: '',
  },
  retweeted_status: {
    id: 0,
    id_str: '',
  }
}

export class TweetModel extends Record(initialModel) {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  in_reply_to_status_id: number;
  in_reply_to_status_id_str: string;
  in_reply_to_user_id: number;
  in_reply_to_user_id_str: string;
  in_reply_to_screen_name: string;
  user: {
    id: number;
    id_str: string;
    screen_name: string;
  };
  retweeted_status: {
    id: number;
    id_str: string;
  }
  retweeted() :boolean {
    return this.retweeted_status.id === 0 ? false : true;
  }
  post() {
    return {
      status: this.text,
      in_reply_to_status_id_str: this.in_reply_to_status_id_str
    }
  }
  replay(tweet: TweetModel) {
    const replayStatus = `@${this.user.screen_name} ${tweet.post().status}`;
    return new TweetModel({
      text: replayStatus,
      in_reply_to_status_id_str: this.id_str
    });
  }
  destroy() {
    return {
      id_str: this.id_str
    }
  }
}