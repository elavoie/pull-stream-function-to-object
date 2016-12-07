var tape = require('tape')
var pull = require('pull-stream')
var toObject = require('../src')

tape('Source function to object', function (t) {
  var count = toObject(pull.count(3))
  var expected = [0, 1, 2, 3]

  if (typeof count !== 'object' ||
    !count.source ||
    count.sink) {
    t.fail('Invalid conversion')
  }

  pull(
    count,
    pull.collect(function (err, actual) {
      if (err) t.fail('Invalid processing')
      t.deepEqual(actual, expected)
      t.end()
    })
  )
})

tape('Sink function to object', function (t) {
  var collect = toObject(pull.collect(function (err, actual) {
    if (err) t.fail('Invalid processing')
    t.deepEqual(actual, expected)
    t.end()
  })
  )
  var expected = [0, 1, 2, 3]

  if (typeof collect !== 'object' ||
    !collect.sink ||
    collect.source ||
    !collect.abort) {
    t.fail('Invalid conversion')
  }

  pull(
    pull.count(3),
    collect
  )
})

tape('Through function to object', function (t) {
  var through = toObject(pull.through())
  var expected = [0, 1, 2, 3]

  if (typeof through !== 'object' ||
    !through.sink ||
    !through.source) {
    t.fail('Invalid conversion')
  }

  pull(
    pull.count(3),
    through,
    pull.collect(function (err, actual) {
      if (err) t.fail('Invalid processing')
      t.deepEqual(actual, expected)
      t.end()
    })
  )
})
