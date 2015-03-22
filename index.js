function toAsyncFunction(source) {
  // source is already an async function - return
  if(typeof source == 'function') {
    return source;
  } else if(isFunction(source._read) && typeof (source._readableState === 'object')) {
    // source is a stream - convert
    return streamToAsyncFunction(source);

  } else if(isFunction(source.then)) {
    // source is a promise - convert
    return promiseToAsyncFunction(source);

  } else {
    // any thing else (object, property ...) - wrap
    return function (cb){
      cb(null,source);
    };
  }
}

// push all data from a stream to an array and return it with a callback
function streamToAsyncFunction(stream) {
  return function (cb){
    var buffer = [];
    stream.on('data',function(data){
      buffer.push(data);
    });
    stream.on('error',function(err){
      cb(err);
    });
    stream.on('end',function(){
      cb(null,buffer);
    });
  };
}

function promiseToAsyncFunction(promise) {
  // is a promise
  // listen to the promise and buffer data if received
  var buffer;
  var error;
  promise.then(function(data){
    buffer = data;
    return data;
  },function(error){
    error = data;
  });
  return function(cb){
    if(typeof buffer !== 'undefined' || typeof error !== 'undefined') {
      cb(error,buffer);
    } else {
      promise.then(function(data){
        cb(null,buffer);
        return data;
      },function(error){
        cb(error);
      });
    }
  };
}

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = toAsyncFunction;
