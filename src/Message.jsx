import React, {Component} from 'react';

class Message extends Component {


  render() {
let msg = this.props.state
console.log("single msg", msg);
    return (
    <div className="messages">
      <div className="message">
        <span className="message-username">{msg.username}</span>
        <span className="message-content">{msg.message}</span>
      </div>
      </div>
    );
  }
}
export default Message;
