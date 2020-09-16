export const isIos = () => {
  let u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export const isWeixin = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger'
}

export const loadWechatSDK = () => {
  let externalScript = document.createElement('script')
  externalScript.setAttribute('src', '//res.wx.qq.com/open/js/jweixin-1.6.0.js')
  document.head.appendChild(externalScript)
  externalScript.onerror = function() {
    const fallback = document.createElement('script')
    fallback.setAttribute('src', '//res2.wx.qq.com/open/js/jweixin-1.6.0.js')
    document.head.appendChild(fallback)
  }
}

export const stringify = params => {
  if (!params) {
    return ''
  }
  return Object.entries(params)
    .map(([key, value]) => `${key}=${window.encodeURIComponent(value)}`)
    .join('&')
}
