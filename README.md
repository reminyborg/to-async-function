# to-async-function
Create a async function from anything (promises, streams, objects and async functions)

[![browser support](https://ci.testling.com/reminyborg/to-async-function.png)
](https://ci.testling.com/reminyborg/to-async-function)

## Install
```
npm install --save to-async-function
```

## Example
To convert any type of dataSources to async function
```javascript
var toAsyncFunction = require('to-async-function');

var dataSource; // can be a promise, stream, object/property and async function
var converted = toAsyncFunction(dataSource);

converted(function(err,data){
  // will return when data is ready

  // err: reported errors if applicable
  // data: data returned
});
```

To create a lib that can take any type of external data. promises, streams, etc... :
```javascript
var toAsyncFunction = require('to-async-function');

// someLib first argument can be any type of data source!!!
function someLib(dataSource){
  var dataSource = toAsyncFunction(dataSource);

  dataSource(function(err,data){
    // do something
  });
}
```
