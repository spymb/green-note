export function beautifyDate(datsStr) {
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let then = dateObj.getTime()
  let now = Date.now()
  let interval = now - then
  let str = ''

  switch (true) {
    case interval < 60000:
      str = '刚刚'
      break
    case interval < 1000*3600:
      str = Math.floor(interval/60000) + '分钟前'
      break
    case interval < 1000*3600*24:
      str = Math.floor(interval/(1000*3600)) + '小时前'
      break
    default:
      str = Math.floor(interval/(1000*3600*24)) + '天前'
  }
  return str
}
