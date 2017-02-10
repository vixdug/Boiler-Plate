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
        messages: [
  ],
  ready: false
 }
    }

    componentDidMount() {
      this.socket = new WebSocket('ws://localhost:5000/');
      console.log("connecting...");

    this.socket.onmessage = ({data}) => {
     const message = JSON.parse(data);
     console.log("on message",message);
     if(message.type)
     {
       switch(message.type)
       {
         case 'clientCount':
           const { count } = message;
           console.log("count in app.js is",count);
           this.setState({
             clientCount: count
           })
           break;
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
        const newMessage = {username: username, content: message, id: Date.now()};
        const newMessageList = this.state.messages;
        this.setState({messages: newMessageList});

      if (username !== this.state.currentUser.username) {
          console.log("this.state.currentUser.username", this.state.currentUser.username);
          let newUserMessage = {
          type: "postNotification",
          message: this.state.currentUser.username + " changed their name to " + username
          };
          this.state.currentUser.username = username;

       let newCurrentUser = {username};
       console.log("new current user",newCurrentUser);
       this.setState({newCurrentUser});
       this.socket.send(JSON.stringify(newUserMessage));
 }
     let msg = {
       type: "postMessage",
       username: this.state.currentUser.username,
       message
     };
     console.log("msg is", msg);
     this.socket.send(JSON.stringify(msg));
 }



  render() {
    console.log("log in the render",this.state.messages);
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
