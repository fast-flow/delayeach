var delayEach = require('./index')
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
