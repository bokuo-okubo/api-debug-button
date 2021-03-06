'use strict';

const React = require('react');
const TestHelper = require('TestHelper');

const Subject = require('components/index/App');

describe('Components::Index::App', () => {
  beforeEach((done) => {
    TestHelper.clearDOM();
    setTimeout(done);
  });

  afterEach((done) => {
    TestHelper.clearDOM();
    setTimeout(done);
  });

  it('正常に表示できる', () => {
    let subject = TestHelper.appendDOM(<Subject/>);
    expect(TestHelper.findComp(subject, Subject)).toEqual(jasmine.any(Subject));
  });
});