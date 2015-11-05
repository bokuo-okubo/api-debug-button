'use strict';

const React = require('react');
const Request = require('superagent');

class DebugButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response : '',
      isSending: false
    };
  }

  clickHdl() {
    let request = Request[this.props.method](this.props.url);

    if (this.props.payload)
      request = request.send(payload);

    request.end((err, res) => {
      let data;
      if (err) {
        data = err.toString();
      } else {
        try {
          data = JSON.parse(res.text);
        } catch (e) {
          data = e.toString();
        }
      }

      this.setState({
        response : data,
        isSending: false
      });
    });

    this.setState({
      isSending: true
    });
  }

  resolveLabel() {
    if (this.state.isSending) {
      return `Sending: ${this.props.url}`;
    } else {
      return `${this.props.method.toUpperCase()}: ${this.props.url}`;
    }
  }

  resolveResponse() {
    if (this.state.isSending) {
      return 'Sending...';
    } else {
      return JSON.stringify(this.state.response, null, '  ');
    }
  }

  render() {
    return (
      <div className="DebugButton">
        <button type="button"
                className="DebugButton__Button"
                onClick={this.clickHdl.bind(this)}>
          {this.resolveLabel()}
        </button>
        <pre className="DebugButton__Response">{this.resolveResponse()}</pre>
      </div>
    );
  }
}

DebugButton.defaultProps = {
  method : 'get',
  url    : '',
  payload: null
};

DebugButton.propTypes = {
  method: React.PropTypes.string.isRequired,
  url   : React.PropTypes.string.isRequired
};

module.exports = DebugButton;
