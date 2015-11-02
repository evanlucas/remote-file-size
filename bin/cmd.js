#!/usr/bin/env node

const help = require('help')()
    , remote = require('../')
    , pb = require('pretty-bytes')
    , nopt = require('noptd')
    , knownOpts = { raw: Boolean
                  , help: Boolean
                  , version: Boolean
                  , auth: String
                  , 'follow-redirect': Boolean
                  , 'max-redirects': Number
                  }
    , shortHand = { r: ['--raw']
                  , h: ['--help']
                  , v: ['--version']
                  , a: ['--auth']
                  , f: ['--follow-redirect']
                  , m: ['--max-redirects']
                  }
    , defs = { raw: false
             , 'follow-redirect': true
             , 'max-redirects': 2
             }
    , parsed = nopt(knownOpts, shortHand)(defs)
    , package = require('../package')

if (parsed.help) {
  return help(0)
}

if (parsed.version) {
  console.log('remote-file-size', 'v' + package.version)
  return
}

const args = parsed.argv.remain

if (!args.length)
  return help(1)

const url = args.shift()
if (url === 'help')
  return help(0)

const opts = {
  uri: url
}

if (parsed.auth) {
  opts.auth = parsed.auth
}

if (parsed['follow-redirect']) {
  opts.followRedirect = parsed['follow-redirect']
}

if (parsed.hasOwnProperty('max-redirects')) {
  opts.maxRedirects = parsed['max-redirects']
}


remote(opts, function(err, out) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  if (parsed.raw) {
    console.log(out)
  } else {
    console.log(pb(out))
  }
})
