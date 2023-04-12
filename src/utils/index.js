let time = null;
export const debounce = (fn, delay) => {
  if(time){
    clearTimeout(time)
  }
  time = setTimeout(() => {
    fn() // 调用接口
  }, delay);
}
// 节流
let flag = true
export const throttle = (fn, delay) => {
  if(flag) {
    setTimeout(() => {
      console.log('触发点击')
      fn() // 调用接口
      flag = true // 在定时器执行后 移除if阻断
    }, delay);
  } 
  flag = false // 在执行一次后 if阻断定时器继续执行
}