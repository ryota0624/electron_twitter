import React from 'react';
import { TemplateModel } from '../../model/template';

class SuggestItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      select: false,
      template: this.props.template,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onChangeInput(e) {
    this.setState({ template: this.state.template.setInput(e.target.value) });
  }
  onKeyPress(e) {
    e.persist();
    if (e.keyCode === 13) {
      this.props.onClick(this.state.template);
    }
  }
  render() {
    const { template } = this.props;
    return (
      <li>
        <span>{template.template}
          <strong>
            <input
              name="input"
              type="text"
              onChange={this.onChangeInput}
              onKeyDown={this.onKeyPress}
            />
          </strong>
        </span>
      </li>
    );
  }
}
SuggestItem.propTypes = {
  template: React.PropTypes.any,
  onClick: React.PropTypes.any,
};

class SuggestFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: new TemplateModel({}),
    };
  }
  render() {
    const { suggestList, onClick } = this.props;
    const suggestListComponents = suggestList.map(suggest =>
      <SuggestItem key={suggest.template} template={suggest} onClick={onClick}/>);
    return (
      <ul>
        {suggestListComponents}
      </ul>
    );
  }
}

SuggestFrom.propTypes = {
  suggestList: React.PropTypes.any,
  onClick: React.PropTypes.any,
};
export default SuggestFrom;
