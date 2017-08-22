var delayEach = require('../index')
var expect = require('expect.js')
describe('basic.test.js', function () {
    it('each', function (done) {
        var startTime = new Date().getTime()
        delayEach(
            [100, 200, 300, 400],
            function handle(item, index, next, finish) {
                switch(index) {
                    case 0:
                        expect(item).to.eql(100)
                    break
                    case 1:
                        expect(item).to.eql(200)
                    break
                    case 2:
                        expect(item).to.eql(300)
                    break
                    case 3:
                        expect(item).to.eql(400)
                    break
                    default:
                        throw new Error('basic.each error')
                }
                setTimeout(function () {
                    next()
                }, 10)
            },
            function finish() {
                var nowTime = new Date().getTime()
                var value = nowTime - startTime
                expect(value).to.be.within(40,70)
                done()
            }
        )
    })
    it('finish end', function (done) {
        var count = 0
        delayEach(
            ['a', 'b', 'c', 'd'],
            function handle(item, index, next, finish) {
                count++
                if (item === 'b') {
                    finish()
                }
                next()
            },
            function finish() {
                setTimeout(function () {
                    expect(count).to.eql(2)
                    done()
                }, 100)
            }
        )
    })
    it('after finish() do not run next()', function (done) {
        var count = 0
        delayEach(
            ['a', 'b', 'c'],
            function handle(item, index, next, finish) {
                count++
                finish()
                next()
            }
        )
        setTimeout(function () {
            expect(count).to.eql(1)
            done()
        }, 200)
    })
    it('nondelay: next() // some code', function (done) {
        var log = []
        var data = ['a', 'b', 'c']
        var checkoutCount = 0
        function checkFinish() {
            checkoutCount++
            if (checkoutCount === data.length) {
                // finish
                expect(log).to.eql([
                    'a',
                    'b',
                    'c'
                ])
                done()
            }
        }
        delayEach(
            data,
            function handle(item, index, next, finish) {
                next()
                log.push(item)
                checkFinish()
            }
        )
    })
    it('nondelay: // some code ;next()', function (done) {
        var log = []
        var data = ['a', 'b', 'c']
        var checkoutCount = 0
        function checkFinish() {
            checkoutCount++
            if (checkoutCount === data.length) {
                // finish
                expect(log).to.eql([
                    'a',
                    'b',
                    'c'
                ])
                done()
            }
        }
        delayEach(
            data,
            function handle(item, index, next, finish) {
                log.push(item)
                next()
                checkFinish()
            }
        )
    })
})
