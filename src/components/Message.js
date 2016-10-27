import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
    this.text = {
      EloUpdate: 'claims they recently beat you. Press OK if this is correct',
      Challenge: 'has challenged you.'
    }
  }
  render() {
  return (
    <div className='message-list' id={this.props.msgId}>
      <p><span className='user-name'>{this.props.sender}</span> {`${this.text[this.props.action]}`}</p>
      <button onClick={() => {
        this.props.updateElo(this.props.sender);
        this.props.deleteMsg(this.props.msgId);
      } }>Ok</button>
      <button onClick={() => this.props.deleteMsg()}>Ignore</button>
    </div>
  )
}
}

export default Message;