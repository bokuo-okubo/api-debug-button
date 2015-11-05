'use strict';

const React = require('react');
const DebugButton = require('components/index/DebugButton');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DebugButton url="https://help.creativesurvey.com/api/v1/entries"/>
        <DebugButton url="https://help.creativesurvey.com/api/v1/entriessss"/>
      </div>
    );
  }
}

module.exports = App;
