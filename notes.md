## webpack

https://github.com/petehunt/webpack-howto

http://webpack.github.io/

http://localhost:8080/webpack-dev-server/bundle

* async loading
* multiple entrypoints (bundles) - big one!

## React

https://github.com/enaqx/awesome-react

state (internal! access through this.state, this.setState to mutate)
vs.
properties (html attrs! access through this.props)

var oboe = require('oboe');

* getInitialState, getDefaultProps
* componentDidMount

## Kryptoradio

* API http://localhost:3000/api/resource/exchange/jsoncsv

## Oboe

http://oboejs.com/

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

            ...
        }
   });

## D3

http://square.github.io/intro-to-d3/
