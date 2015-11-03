# remote-file-size

[![Build Status](https://travis-ci.org/evanlucas/remote-file-size.svg)](https://travis-ci.org/evanlucas/remote-file-size)
[![Coverage Status](https://coveralls.io/repos/evanlucas/remote-file-size/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/remote-file-size?branch=master)

Get the size of a remote file

*Note: remote-file-size is only supported on iojs and node v4+. To use with
an older version of node, please use `remote-file-size@2`.*

## Install

```bash
$ npm install --save remote-file-size
# or for the cli tool
$ npm install -g remote-file-size
```

## Usage

```bash
$ remote-file-size http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz
// => 1.55 kB
```

```js
var remote = require('remote-file-size')
var url = 'http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz'
remote(url, function(err, o) {
  console.log(o)
  // => 1548
})
```

## CLI Usage

```
$ remote-file-size --help

remote-file-size - get the size of a remote file

  usage: remote-file-size [options] <url>

  options:
    -h, --help                  show help and usage
    -v, --version               show version
    -r, --raw                   show raw result (no pretty formatting)
    -f, --follow-redirect       follow redirects (true by default)
    -m, --max-redirects <num>   set max number of redirects (defaults to 2)

  example:
    remote-file-size http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz
    // => 1.55 kB

    remote-file-size --raw http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz
    // => 1548
```

`remote-file-size` uses `request` under the hood, so you could
also pass an options object instead of the url string.

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
