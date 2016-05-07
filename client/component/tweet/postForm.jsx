import React from 'react';
import SuggestForm from './suggestForm';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onClickPost = this.onClickPost.bind(this);
    this.onSubmitSuggest = this.onSubmitSuggest.bind(this);
  }
  onChangeText(e) {
    this.setState({ text: e.target.value });
  }
  onClickPost(e) {
    e.preventDefault();
    this.props.onClickPost(this.state.text);
    this.setState({ text: '' });
  }
  onSubmitSuggest(template) {
    this.setState({ text: template.getText() });
  }
  render() {
    const { text } = this.state;
    const suggests = this.props.getTemplate(text);
    const { className } = this.props;
    return (
      <div className={className} >
        <form className="uk-form">
          <div className="uk-form-row">
            <textarea
              className="uk-width-1-1"
              cols="" rows=""
              placeholder="Post tweet"
              onChange={this.onChangeText}
              value={text}
            />
            <button className="uk-button" onClick={this.onClickPost}>POST</button>
          </div>
        </form>
        <SuggestForm suggestList={suggests} onClick={this.onSubmitSuggest} />
      </div>
    );
  }
}

PostForm.propTypes = {
  className: React.PropTypes.string,
  onClickPost: React.PropTypes.any,
  getTemplate: React.PropTypes.any,
};

export default PostForm;

