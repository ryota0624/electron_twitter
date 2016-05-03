import * as React from 'react';

export class DumpComponent extends React.Component {
  static get contextTypes() {
    return {
      dispatch: React.PropTypes.any,
    };
  }
  constructor(props, context) {
    super(props, context);
    this.dispatch = this.context.dispatch;
  }
  render() {
    return null;
  }
}
