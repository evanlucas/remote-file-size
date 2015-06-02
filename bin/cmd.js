#!/usr/bin/env node

var help = require('help')()
  , remote = require('../')
  , pb = require('pretty-bytes')
  , args = process.argv.splice(2)

if (!args.length)
  return help(1)

var h = ['help', '--help', '-h']
var url = args.shift()
if (~h.indexOf(url)) {
  return help(0)
} else {
  remote(url, function(err, out) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(pb(out))
  })
}
