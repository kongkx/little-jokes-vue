/* eslint-disable no-constant-condition */
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

export const copyToClipboard = text => {
  if (navigator.permissions) {
    return navigator.permissions
      .query({ name: 'clipboard-write' })
      .then(result => {
        if (result.state === 'denied') {
          throw result
        } else if (result.state === 'granted') {
          return navigator.clipboard.writeText(text)
        }
      })
  } else if (window.clipboardData) {
    window.clipboardData.setData(text)
    return Promise.resolve()
  } else if (isIos()) {
    const error = new Error('IOS not supported')
    error.code = 'IS_IOS'
    return Promise.reject(error)
  } else {
    // Create a temporary element off screen.
    const tmpElem = document.createElement('div')
    return new Promise((resolve, reject) => {
      try {
        tmpElem.style.position = 'fixed'
        tmpElem.style.left = '0'
        tmpElem.style.top = '0'
        tmpElem.style.zIndex = 1000000
        // Add the input value to the temp element.
        tmpElem.innerText = text
        tmpElem.contentEditable = true
        tmpElem.readOnly = false
        document.body.appendChild(tmpElem)
        // Select temp element.
        const range = document.createRange()
        range.selectNodeContents(tmpElem)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        document.execCommand('copy')
        resolve()
      } catch (err) {
        reject(err)
      } finally {
        document.body.removeChild(tmpElem)
      }
    })
  }
}
