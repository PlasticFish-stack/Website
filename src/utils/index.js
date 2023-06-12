
export const debounce = (fn, delay) => {
  let time = null;
  return function(){
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, arguments);
    },delay)
  }
}
// 节流

export const throttle = (fn, delay) => {
  console.log(fn)
  let flag = true
  if(flag) {
    setTimeout(() => {
      
      fn() // 调用接口
      flag = true // 在定时器执行后 移除if阻断
    }, delay);
  } 
  flag = false // 在执行一次后 if阻断定时器继续执行
}