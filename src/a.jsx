/** @jsx React.DOM */

var React = require('react/addons');
//var d3 = require('d3');

var B = require('./b');


var A = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      number: Math.round(Math.random() * 100),
      offset: 0
    };
  },

  componentWillMount: function () {
    this._intervalHandle = window.setInterval(this.incrementNumber, 1000);
  },

  componentWillUnmount: function () {
    window.clearInterval(this._intervalHandle);
    window.alert('Unmounting parent');
  },

  incrementNumber: function () {
    this.setState({
      number: this.state.number + parseInt(this.state.offset, 10)
    });
  },

  decrementNumber: function () {
    this.setState({
      number: this.state.number - parseInt(this.state.offset, 10)
    })
  },

  render: function() {
    return (
      <div>
        <p>Open an editor, edit and save <code>example/a.jsx</code>.</p>
        <p><b>The number should keep incrementing one by one.</b></p>

        {this.renderStuff()}

        <p>This should also work for children:</p>
        <B />
        <B />
      </div>
    );
  },

  renderStuff: function () {
    return (
      <div>
        <input type='text' value={this.state.number} readOnly />
        <button onClick={this.incrementNumber}>Increment by one</button>
        <button onClick={this.decrementNumber}>Decrement by one</button>
        <input type='text' valueLink={this.linkState('offset')} />
      </div>
    );
  }
});

module.exports = A;
