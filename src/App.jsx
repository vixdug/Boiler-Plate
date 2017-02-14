import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {username: "Anonymous"},
      messages: [],
      ready: false
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:5000/');
    console.log("connecting...");

    this.socket.onmessage = ({data}) => {
      const message = JSON.parse(data);
      const { type, count } = message;

      // maybe raise error here if type doesnt exist or is wrong 'type'
      if(type) {
        switch(type) {
          case 'clientCount':
            this.setState({ clientCount: count});
            break;
            // what happens here?
          case 'incomingNotification':
          case 'incomingMessage':
            const oldMessages = this.state.messages;
            this.setState({
              messages: [...oldMessages, message]
            })
            break;
          default:
            console.error("Unknown message type", message);
        }
      }
    },

      this.socket.onopen = () => {
        console.log("Connected to server");
      };
    console.log("componentDidMount <App />");
  }

  addMessage(username, message) {
    const newMessage     = { username, content: message, id: Date.now() };
    const newMessageList = this.state.messages;
    const stateUsername  = this.state.currentUser.username;

    this.setState({messages: newMessageList});

    if (username !== stateUsername) {
      let newUserMessage = {
        type: "postNotification",
        message: `${stateUsername} changed their name to ${username}`
      };

      this.state.currentUser.username = username;

      let newCurrentUser = { username };
      this.setState({newCurrentUser});
      this.socket.send(JSON.stringify(newUserMessage));
    }

    let msg = {
      type: "postMessage",
      username: stateUsername,
      message
    };

    this.socket.send(JSON.stringify(msg));
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} clientCount={this.state.clientCount} />
        <ChatBar newMessage={this.addMessage.bind(this)} currentUser={this.state.currentUser.username} />
        <Navbar  clientCount={this.state.clientCount} />
      </div>
    );
  }
}

export default App;
