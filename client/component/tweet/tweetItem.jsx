import React from 'react';
import { TweetModel } from '../../model/tweet';
import ImgPanel, { listStyle } from './imgPanel';
import { DumpComponent } from '../dumpComponent';
import { tweetTextParse } from '../../utils/tweet';

function imgPanelListFactory(tweet, clickFactory) {
  return tweet.getMedia().map((media, i) => {
    const onClick = clickFactory({ url: media.getUrl() });
    return (<ImgPanel key={i} media={media} onClick={onClick} />);
  });
}
function tweetTextToComponent(tweet, clickFactory) {
  return tweet.map((line, indexArr) => {
    const onClick = clickFactory({ url: line.linkUrl, windowSize: { width: 600, height: 400 } });
    if (line.link) {
      const noLinkText = line.text.slice(0, line.index);
      const noLinkTextComponent = noLinkText.split(/(.{20})/)
            .map((noLinkLine, i) => <p key={i}>{noLinkLine}</p>);
      return line.appendText ?
        <span key={indexArr}>
          {noLinkTextComponent}
          <p><a onClick={onClick}>
            {line.linkUrl}
          </a></p>
        </span>
        : <span key={indexArr}>
          <p><a onClick={onClick}>
            {line.linkUrl}
          </a></p></span>;
    }
    return <p key={indexArr}>{line.text}</p>;
  });
}

class TweetItem extends DumpComponent {
  constructor(props, context) {
    super(props, context);
    this.reply = this.reply.bind(this);
  }
  shouldUpdateComponent() {
    return true;
  }
  goTweetDetail() {
    this.dispatch('goTweetDetail', { tweetId: this.props.tweet.id_str });
  }
  reply(tweet) {
    return () => {
      const { account } = this.props;
      this.dispatch('openReplyWindow', { accountId: account.id_str, tweet });
    };
  }
  retweet({ tweet, fetchUser, getTweetById, userId }) {
    const retweetId = tweet.id_str;
    const retweet = getTweetById(retweetId);
    const retweetUser = fetchUser(userId);
    return (
      <li>
        RT by {retweetUser.name}
        <ul>
          {this.renderTweet({ tweet: retweet, fetchUser })}
        </ul>
      </li>
    );
  }
  tweet({ tweet, fetchUser }) {
    return this.renderTweet({ tweet, fetchUser });
  }
  postFav(tweet) {
    return () => {
      const { account } = this.props;
      this.dispatch('postFav', { accountId: account.id_str, tweet });
    };
  }
  renderTweet({ tweet, fetchUser }) {
    if (!tweet) {
      return null;
    }
    const mediaClick = ({ url, windowSize }) => () => this.dispatch('openUrl', { url, windowSize });
    const { text } = this.props.tweet;
    const openReplyWindow = this.reply(tweet);
    const postFav = this.postFav(tweet);
    const account = fetchUser(tweet.user.id_str);
    const imgPanels = imgPanelListFactory(tweet, mediaClick);
    const tweetText = tweetTextToComponent(tweetTextParse(text), mediaClick);
    const favIcon = tweet.favorited ? 'star-o' : 'star';
    return (
      <li>
        <div className="uk-panel">
          <h3 className="uk-panel-title">
            <img src={account.profile_image_url} alt={'hoge'} />
            {account.name}
          </h3>
          <div>{tweetText}</div>
          <a className="uk-icon-reply uk-icon-medium" onClick={openReplyWindow}></a>
          {"  "}<a className={`uk-icon-${favIcon} uk-icon-medium`} onClick={postFav}></a>
          <ul style={listStyle}>
            {imgPanels}
          </ul>
        </div>
      </li>
    );
  }
  render() {
    const { fetchUser, tweet, getTweetById } = this.props;
    const tweetComponent = tweet.retweeted() ?
      this.retweet({
        userId: tweet.user.id_str,
        fetchUser,
        tweet: tweet.retweeted_status,
        getTweetById,
      })
      : this.tweet({ fetchUser, tweet });
    return tweetComponent;
  }
}

TweetItem.propTypes = {
  tweet: React.PropTypes.any,
  fetchUser: React.PropTypes.any,
  getTweetById: React.PropTypes.any,
  goTweetDetail: React.PropTypes.any,
  reply: React.PropTypes.any,
  account: React.PropTypes.any,
};
TweetItem.defaultProps = {
  tweet: new TweetModel(),
};

export default TweetItem;
