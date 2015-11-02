'use strict'

const test = require('tap').test
    , remote = require('./')
    , http = require('http')

test('should fail on invalid url', function(t) {
  remote('blah', function(err, out) {
    t.ok(err, 'err should exist')
    t.equal(err.message, 'Invalid URI "blah"')
    t.end()
  })
})

test('should fail on 404', function(t) {
  remote('http://evanlucas.com/biscuits', function(err, out) {
    t.ok(err, 'err should exist')
    t.equal(err.message, 'Received invalid status code: 404')
    t.end()
  })
})

test('should return null, size on success', function(t) {
  const u = 'http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz'
  remote(u, function(err, out) {
    t.ifError(err, 'err should not exist')
    t.ok(out, 'out should exist')
    t.equal(out, 1548)
    t.end()
  })
})

test('should work passing an object', function(t) {
  const opts = {
    uri: 'http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz'
  }

  remote(opts, function(err, out) {
    t.ifError(err, 'err should not exist')
    t.ok(out, 'out should exist')
    t.equal(out, 1548)
    t.end()
  })
})

test('should return error if invalid content-length', function(t) {
  t.plan(2)
  const server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end()
  }).listen(0, function() {
    const port = server.address().port
    remote(`http://localhost:${port}/`, function(err, out) {
      t.ok(err, 'err should exist')
      t.equal(err.message, 'Unable to determine file size')
    })
  })

  t.on('end', function() {
    server.close()
  })
})
