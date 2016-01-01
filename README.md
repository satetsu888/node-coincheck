## install

```
npm install node-coincheck
```

## Public API
```
var coincheck = require('node-coincheck');
var api = coincheck.PublicApi;

api.ticker(function(err, body) {
        console.log(body);
    }
)

api.trades(offset, function(err, body) {
        console.log(body);
    }
)
```

## Private API

```
var coincheck = require('node-coincheck');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./config.json').then(JSON.parse).
then(function(config){
    var api = coincheck.createPrivateApi(config.coincheck_apikey, config.coincheck_secretkey, 'user agent is node-coincheck');
    // call api
    api.getBalance(function(err, body) {
            console.log(body);
        }
    );
    api.activeOrders(function(err, body) {
            console.log(body);
        }
    );
    api.trade('btc_jpy', 'buy', 1, 1, function(err, body) {
            console.log(body);
        }
    );
    api.cancelOrder(5910927, function(err, body) {
            console.log(body);
        }
    );

    // for leverage
    api.getLeverageBalance(function(err, body){
            console.log(body);
        }
    );

    api.transferToLeverage('JPY', 10000, function(err, body){
            console.log(body);
        }
    );

    api.transferFromLeverage('JPY', 10000, function(err, body){
            console.log(body);
        }
    );
}).catch(console.log);
```

## Generator Style

```
var coincheck = require('node-coincheck');
var co = require('co');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

co(function *(){
    var config = yield fs.readFileAsync('./config.json', 'utf8').then(JSON.parse);
    var api = Promise.promisifyAll(
        coincheck.createPrivateApi(
            config.coincheck_apikey,
            config.coincheck_secretkey,
            'user agent is node-coincheck'
        )
    );

    var balance = yield api.getBalanceAsync();
    console.log(balance);

    // call other apis...

}).catch(function(e){
    console.log(e.stack);
});

```
