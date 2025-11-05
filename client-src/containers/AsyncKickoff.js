import React from 'react';
import PropTypes from 'prop-types';

// Component that kicks off an asynchronous request on mount and renders nothing.
class AsyncKickoff extends React.Component {
  componentWillMount() {
    this.props.doRequest(this.props.creds)
  }

  render() {
    return null
  }
}

AsyncKickoff.propTypes = {
  creds: PropTypes.object.isRequired,
  doRequest: PropTypes.func.isRequired
}

export default AsyncKickoff
