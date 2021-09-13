export class NavUA {
  _ua
  // 是否为旧版 Edge
  isOldEdge
  // 是否为 Firefox
  isFirefox
  constructor() {
    this._ua = navigator.userAgent
    const math = this._ua.match(/(Edge?)\/(\d+)/)
    this.isOldEdge = math && math[1] == 'Edge' && parseInt(math[2]) < 19 ? true : false
    this.isFirefox = /Firefox\/\d+/.test(this._ua) && !/Seamonkey\/\d+/.test(this._ua) ? true : false
  }

  // 是否为 IE
  isIE() {
    return 'ActiveXObject' in window
  }

  // 是否为 webkit
  isWebkit() {
    return /webkit/i.test(this._ua)
  }
}

export const UA = new NavUA()
