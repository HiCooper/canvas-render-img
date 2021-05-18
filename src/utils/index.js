export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function getRandomStr (length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function getRgbStr (hexColor) {
  hexColor = hexColor.substr(1)
  let str
  const a = []
  for (let i = 0; i < 3; i++) {
    str = hexColor.substr(i * 2, 2)
    a[i] = parseInt(str, 16)
  }
  return a.join(',')
}

export function getUuid () {
  /**
   * @return {string}
   */
  function S4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }

  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`)
}

/**
 * 检查参数，如果任何一个value 为零值[ undefined, '', {}, [], null ] 则返回false
 * @param params 可以是基本类型，列表 或对象
 * @param ignoreKeys 忽略检查的属性 列表 like ['name']
 * @returns {boolean}
 */
export function checkParams (params, ignoreKeys) {
  let result = true
  if (typeof params === 'string' || (typeof params === 'number' && params !== 0) || (typeof params === 'boolean' && params !== false)) {
    return !!params
  }
  if (params === undefined || JSON.stringify(params) === '{}') {
    result = false
  } else if (Array.isArray(params)) {
    if (params.length === 0) {
      result = false
    } else {
      Object.values(params)
        .every((value) => {
          result = checkParams(value, ignoreKeys)
          return result
        })
    }
  } else if (typeof params === 'object') {
    Object.entries(params)
      .every((entry) => {
        if (!ignoreKeys || !ignoreKeys.find(v => v === entry[0])) {
          result = checkParams(entry[1], ignoreKeys)
        }
        return result
      })
  }
  return result
}
