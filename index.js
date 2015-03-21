function toAsyncFunction(source) {
  // is it already an async function
  if(typeof source == 'function') {
    return source;
  // is a stream
  } else if(isFunction(source._read) && typeof (source._readableState === 'object')) {
    // get all data from stream and return with callback
    return function (cb){
      var buffer = [];
      source.on('data',function(data){
        buffer.push(data);
      });
      source.on('error',function(err){
        cb(err);
      });
      source.on('end',function(){
        cb(null,buffer);
      });
    };
  /*} else if(isFunction(source.then)) {
    return function(cb){
      source.then(function(data){
        cb(err,data);
        return data;
      },function(err){
        cb(err);
      });
    };*/
  } else {
    return function (cb){
      cb(null,source);
    };
  }
}

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = toAsyncFunction;
