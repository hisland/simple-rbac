const { execSync } = require('child_process')

module.exports = {
  publicPath: './',
  configureWebpack(config) {},
  chainWebpack(config) {},
  devServer: {
    host: 'localhost',
    port: 9621,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9622',
        onProxyReq,
      },
    },
  },
}

function onProxyReq(proxyReq, req, res) {
  console.log(
    `${easyFormatTime2(new Date())}: ${proxyReq.method}: ${proxyReq.getHeader(
      'host'
    )} -> ${proxyReq.path}`
  )
}

function easyFormatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [year, month, day].map(formatNumber).join('') +
    '_' +
    [hour, minute, second].map(formatNumber).join('')
  )
}
function easyFormatTime2(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}
function formatNumber(nn) {
  return nn < 10 ? '0' + nn : nn
}
