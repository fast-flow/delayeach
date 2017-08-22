/**
 * function - 延迟遍历
 * @param {array} task
 * @param {taskHandle}
 * @param {finishCallback}
 */
/**
  * @callback - itemHandle
  * @param {any} - value
  * @param {number} - index
  * @param {function} - next
  * @param {function} - finish
  */
 /**
  * @callback - finishCallback
  */
module.exports = function delayEach(task, itemHandle, finishCallback) {
    var taskCount = task.length
    if (taskCount === 0) {
        return
    }
    var isFinish = false
    var callFinish = function () {
        if (!isFinish) {
            isFinish = true
            if (typeof finishCallback === 'function') {
                finishCallback()
            }
        }
    }
    function handleTask(index) {
        var item = task[index]
        itemHandle(
            item,
            index,
            function next () {
                if (isFinish) {
                    return
                }
                var nextIndex = index + 1
                if (nextIndex !== taskCount) {
                    setTimeout(function () {
                        handleTask(nextIndex)
                    }, 0)
                }
                else {
                    callFinish()
                }
            },
            function finish() {
                callFinish()
            }
        )
    }
    handleTask(0)
}
