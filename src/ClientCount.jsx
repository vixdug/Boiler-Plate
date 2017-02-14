import React from 'react';

const ClientCount = React.createClass({
  render: function() {
    const { clientCount } = this.props;
    return (
      <div className="online users">
        <h4>
          There { clientCount === 1 ? 'is' : 'are'} { clientCount } { clientCount === 1 ? 'user' : 'users' } online
        </h4>
      </div>
    )
  }
});

export default ClientCount;
