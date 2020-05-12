import React from 'react';

const htmlFile = require('./tc.html');

class TC extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: htmlFile }} />
    }
}

export default TC;