# remote-file-size

Get the size of a remote file

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

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
