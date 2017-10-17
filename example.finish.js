var delayEach = require('./index')
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
