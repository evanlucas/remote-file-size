#!/usr/bin/env node

var help = require('help')()
  , remote = require('../')
  , pb = require('pretty-bytes')
  , nopt = require('noptd')
  , knownOpts = { raw: Boolean
                , help: Boolean
                , version: Boolean
                }
  , shortHand = { r: ['--raw']
                , h: ['--help']
                , v: ['--version']
                }
  , defs = { raw: false }
  , parsed = nopt(knownOpts, shortHand)(defs)
  , package = require('../package')

if (parsed.help) {
  return help(0)
}

if (parsed.version) {
  console.log('remote-file-size', 'v' + package.version)
  return
}

var args = parsed.argv.remain

if (!args.length)
  return help(1)

var url = args.shift()
if (url === 'help')
  return help(0)

remote(url, function(err, out) {
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
