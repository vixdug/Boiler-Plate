import ClientCount from './ClientCount.jsx';

import React, {Component} from 'react';

class Navbar extends Component {


  render() {

    return (

    <nav className="navbar">
      <a href="/" className="navbar-brand">CHATTY</a>
      <ClientCount
         clientCount={this.props.clientCount}
       />
    </nav>
    );
  }
}

export default Navbar;
