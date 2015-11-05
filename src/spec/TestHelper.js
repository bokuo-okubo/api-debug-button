'use strict';

const TestContainerID = 'Subject';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

class TestHelper {
  static isTestContainer() {
    return !!document.getElementById(TestContainerID);
  }

  static clearDOM() {
    if (TestHelper.isTestContainer())
      ReactDOM.unmountComponentAtNode(document.getElementById(TestContainerID));
    document.body.innerHTML = `<div id="${TestContainerID}"></div>`;
  }

  static appendDOM(component) {
    if (!TestHelper.isTestContainer()) throw new Error('TestContainer is not defined');

    return ReactDOM.render(
      component,
      document.getElementById(TestContainerID)
    );
  }

  /**
   * TestUtils.findRenderedComponentWithType 打つのがだるい人向け
   */


  static findComp(component, klass) {
    return TestUtils.findRenderedComponentWithType(component, klass);
  }

  /**
   * TestUtils.scryRenderedComponentsWithType 打つのがだるい人向け
   */

  static scryComp(component, klass) {
    return TestUtils.scryRenderedComponentsWithType(component, klass);
  }
}

module.exports = TestHelper;