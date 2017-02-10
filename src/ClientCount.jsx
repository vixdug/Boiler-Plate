import React from 'react';

const ClientCount = React.createClass({
  render: function() {
    return (
      <div className="online users">
        <h4>There {this.props.clientCount == 1 ? 'is' : 'are'} { this.props.clientCount } { this.props.clientCount == 1 ? 'user' : 'users' } online</h4>
      </div>
    )
  }
});

export default ClientCount;
