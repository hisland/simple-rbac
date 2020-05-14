import Vue from 'vue'

function formatNumber(nn) {
  return nn < 10 ? '0' + nn : nn
}
function formatTime(date1, format = 'datetime') {
  const date2 = new Date(date1)
  if (date1 && date2.toString() !== 'Invalid Date') {
    const year = date2.getFullYear()
    const month = date2.getMonth() + 1
    const day = date2.getDate()
    const hour = date2.getHours()
    const minute = date2.getMinutes()
    const second = date2.getSeconds()
    if (format === 'datetime') {
      return (
        [year, month, day].map(formatNumber).join('-') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
      )
    } else if (format === 'date') {
      return [year, month, day].map(formatNumber).join('-')
    } else if (format === 'time') {
      return [hour, minute, second].map(formatNumber).join(':')
    } else {
      throw Error('formatTime: format 参数只支持 datetime | date | time')
    }
  } else {
    return ''
  }
}

function __formatIntComma(str, commaLen = 3, commaChar = ',') {
  const strLength = str.length
  if (strLength <= commaLen) {
    return str
  } else {
    return (
      __formatIntComma(str.substr(0, strLength - commaLen)) +
      commaChar +
      str.substr(strLength - commaLen)
    )
  }
}
function formatPrice(val, decimalLen = 2, commaLen = 3) {
  let num = val - 0,
    isNegative = num < 0
  if (isNaN(num)) {
    return val ? val : '0'
  } else {
    num = num.toFixed(decimalLen)
    const dotRest = num.slice(-(decimalLen + 1))
    const integer = num.slice(isNegative ? 1 : 0, -(decimalLen + 1))
    return (
      (isNegative ? '-' : '') + __formatIntComma(integer, commaLen) + dotRest
    )
  }
}

Vue.filter('formatTime', formatTime)
Vue.filter('formatPrice', formatPrice)
