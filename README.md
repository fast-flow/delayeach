# delay each

> delay each  `delayEach(arr, iterateFn(item, index, next, finish), finishFn)`

## install

```shell
npm install delayeach
```

```js
var delayEach = require('delayeach')
var fs = require('fs')
var files = [
    './example/a.txt',
    './example/b.txt',
    './example/c.txt'
]
var contents = []
delayEach(
    files,
    function handle(file, index, next, finish) {
        fs.readFile(file, function (err, data) {
            var text
            if (err) {
                text = err.message
            }
            else {
                text = data.toString()
            }
            contents[index] = text
            if (err) {
                finish()
            }
            else {
                next()
            }

        })
    },
    function finish () {
        console.log('finish')
        console.log(JSON.stringify(contents))
    }
)
/**
 *   file: a.txt b.txt c.txt
 *   ["aaa\n","bbb\n","ccc\n"]
 */
 /**
  *  file: a.txt c.txt
  *  ["aaa\n","ENOENT: no such file or directory, open './example/b.txt'"]
  */
```

**finish(message)**

```js
var delayEach = require('delayeach')
var arr = [1,2,3]
delayEach(arr, function (item, index, next, finish) {
    console.log(item)
    if (index === 1) {
        finish('index: 1')
    }
    next()
}, function finish(log) {
    switch(log) {
        case 'index: 1':
            console.log('do something...')
        break
        default:
            console.log('each all the data')
    }
})
```

```js
/**
 * function delayEach - 延迟遍历
 * @param {array} task
 * @param {taskHandle}
 * @param {finishCallback}
 */
/**
  * @callback - handle
  * @param {any} - value
  * @param {number} - index
  * @param {function} - next
  * @param {function} - finish
  */
 /**
  * @callback - finish
  */
```
