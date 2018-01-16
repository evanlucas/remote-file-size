'use strict'

var request = require('request')

module.exports = function(options, cb) {
  if ('string' === typeof options) {
    options = {
      uri: options
    }
  }
  options = options || {}

  options.method = 'HEAD'
  options.followAllRedirects = true
  options.followOriginalHttpMethod = true

  request(options, function(err, res, body) {
    if (err) return cb(err)
    const code = res.statusCode
    if (code >= 400) {
      return cb(new Error('Received invalid status code: ' + code))
    }

    var len = res.headers['content-length']
    if (!len) {
      return cb(new Error('Unable to determine file size'))
    }
    len = +len
    if (len !== len) {
      return cb(new Error('Invalid Content-Length received'))
    }

    cb(null, +res.headers['content-length'])
  })
}
