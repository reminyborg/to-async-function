# to-async-function
Create a async function from anything (promises, streams, objects and async functions)

## Install
```
npm install --save to-async-function
```

## Example
To convert any type of dataSources to async function
```javascript
var toAsyncFunction = require('to-async-function');


var dataSource; // can be promises, streams, objects and async functions
var converted = toAsyncFunction(dataSource);

converted(function(err,data){
  // will return when dataSource data is ready

  // err: datasource reported errors if applicable
  // data: data returned from
});
```

To create a lib that can take any type of external data source promises, streams, etc... :
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
