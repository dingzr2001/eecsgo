// 节流函数
function throttle(func, wait) {
  let timeout // 定义一个计时器变量，用于限制函数调用频率
  return function (...args) {
    // 返回一个包装后的函数
    const context = this // 保存函数执行上下文对象
    if (!timeout) {
      // 如果计时器不存在
      func.apply(context, args) // 执行函数
      timeout = setTimeout(() => {
        timeout = null // 清空计时器变量
      }, wait) // 创建计时器，在指定时间后重置计时器变量
    }
  }
}
export { throttle }
