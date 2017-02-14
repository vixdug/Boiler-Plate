import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {user: this.props.currentUser, messageContent: ''};
  }

  handleUserNameChange(event) {
    this.setState({user: event.target.value});
  }

  handleMessageContentChange(event) {
    this.setState({messageContent: event.target.value});
  }

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.user, this.state.messageContent);
    }
  }

  render() {
    const chatbarContext = this;
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          value={this.state.user}
          onChange={this.handleUserNameChange.bind(chatbarContext)} />

        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          value={this.state.messageContent}
          onChange={this.handleMessageContentChange.bind(chatbarContext)}
          onKeyDown={this.handleEnterKey.bind(chatbarContext)}/>
      </footer>
    );
  }
}

export default ChatBar;
