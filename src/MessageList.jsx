import React, {Component} from 'react';
import Message from './Message.jsx';
import ClientCount from './ClientCount.jsx';

class MessageList extends Component {



  render() {

    return (
    <div className="message system">
    <div id="message-list">
    {this.props.messages.map((msg, i) => {
      return (<Message state={msg} key={i} />)
    }
    )}
     </div>
     </div>
    );
  }
}
export default MessageList;
