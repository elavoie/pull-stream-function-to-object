[![Build Status](https://travis-ci.org/elavoie/pull-stream-function-to-object.svg?branch=master)](https://travis-ci.org/elavoie/pull-stream-function-to-object)

# pull-stream-function-to-object

Converts a pull-stream function into an equivalent object form. 

Additional methods on the function are also present on the object with their 'this' parameter bound to the original function.

Useful when you want to access the source and/or the sink directly,
or when you do not want to deal with both object and function forms.

    var pull = require('pull-stream')
    var toObject = require('pull-stream-function-to-object')
    var drain = toObject(pull.drain())
    pull(
        pull.count(10),
        drain.sink,
    )
