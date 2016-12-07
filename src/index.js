module.exports = function (f) {
  if (typeof f !== 'function') {
    return f
  }

  var stream = {}

  for (var p in f) {
    if (f.hasOwnProperty(p)) {
      stream[p] = f[p].bind(f)
    }
  }

  if (f.length === 2) {
    stream.source = f
  } else if (f.length === 1) {
    var _read
    var args = null
    var read = function read (abort, cb) {
      if (_read) {
        _read(abort, cb)
      } else {
        args = [abort, cb]
      }
    }
    stream.sink = function (read) {
      _read = read
      if (args) {
        _read(args[0], args[1])
      }
    }

    var source = f(read)

    if (typeof source === 'function') {
      stream.source = source
    }
  } else {
    throw new Error('Invalid pull-stream function')
  }

  return stream
}
