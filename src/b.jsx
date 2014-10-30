/** @jsx React.DOM */

var React = require('react');

var oboe = require('oboe');


var B = React.createClass({
  render: function() {
    return (
      <div style={{background: 'green', color: 'white'}}>
        <C />
      </div>
    );
  },

  componentWillUnmount: function () {
    window.alert('Unmounting child');
  }
});

var C = React.createClass({
  getInitialState: function() {
      return {
          exchanges: [],
          requests: [],
          bids: [],
          trades: []
      };
  },
  componentDidMount: function() {
    var that = this;

    oboe('http://localhost:3000/api/resource/exchange/jsoncsv')
       .node('*', function(arr) {
            if(Array.isArray(arr) && Array.isArray(arr[0])) {
                arr = arr[0];

                var actionType = arr[3];
                var priceLevel = parseFloat(arr[4]);
                var amount = parseFloat(arr[5]);
                amount = isNaN(amount)? 0: amount;

                var o = {
                    marketName: arr[0],
                    securityName: arr[1],
                    currency: arr[2],
                    actionType: actionType,
                    priceLevel: priceLevel,
                    amount: amount
                };

                that.setState({
                    exchanges: that.state.exchanges.concat([o])
                });

                addPrice({
                    R: 'requests',
                    B: 'bids',
                    T: 'trades'
                }[actionType], priceLevel);
            }

             function addPrice(name, level) {
                 if(!name) {
                     return console.warn('addPrice - missing name');
                 }

                 var state = that.state[name];
                 var o = {};

                 o[name] = state.concat({
                     x: state.length,
                     y: level
                 });

                 that.setState(o);
            }
       });
  },
  render: function () {
    console.log(this.state);

    return <span>This should also work for multiple components in the same file.</span>;
  }
});

module.exports = B;
