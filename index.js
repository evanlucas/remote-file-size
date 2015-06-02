var url = require('url')

module.exports = function(uri, cb) {
  var parsed
  try {
    parsed = url.parse(uri)
  }
  catch (err) {
    return cb(err)
  }

  if (!parsed.host) {
    return cb(new Error('Invalid url: ' + uri))
  }

  var opts = {
    host: parsed.host
  , port: parsed.port
  , path: parsed.path
  , method: 'HEAD'
  }

  var http = parsed.protocol === 'https:'
    ? require('https')
    : require('http')

  http.request(opts, function(res) {
    var code = res.statusCode
    if (code >= 400) {
      return cb(new Error('Received invalid status code: ' + code))
    }
    cb(null, +res.headers['content-length'])
  }).end()
}
