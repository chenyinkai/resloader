/**
 * Copyright (c) 2017 chenyinkai
 * License: MIT
 * https://github.com/chenyinkai/resloader
 **/

/**
 * Checks the value is an object or not
 *
 * @param  {*} value value The value to check
 * @return {boolean}       Returns `true` if `value` is an object, else `false`
 */
const isObject = value => {
  return typeof value === 'object' && !!value
}

/**
 * Checks the value is an Array or not
 *
 * @param  {*} value value The value to check
 * @return {boolean}       Returns `true` if `value` is an Array, else `false`
 */
const isArray = value => {
  return toString.call(value) === '[object Array]'
}

/**
 * Checks the value is a Function or not
 *
 * @param  {*} value value The value to check
 * @return {boolean}       Returns `true` if `value` is an Function, else `false`
 */
const isFunction = value => {
  return toString.call(value) === '[object Function]'
}

let resLoaderObj = {
  total: 0,
  start (options) {
    let imageArr = options.resources
    this.total = options.resources.length
    if (isFunction(options.onStart)) {
      options.onStart(this.total)
    }
    Promise.all(this._PromiseArray(imageArr, options.onProgress))
      .then(result => {
        if (isFunction(options.onComplete)) {
          options.onComplete(this.total, result)
        }
      })
      .catch(err => console.log(err))
  },
  _PromiseArray (imageArr, callback) {
    let promiseArr = []
    let currentIndex = 0
    for (let i = 0; i < imageArr.length; i++) {
      let reg = /\.(jpg|jpeg|png|gif|svg|webp)(\?\S*)?$/i
      let isImg =
        (isObject(imageArr[i]) && reg.test(imageArr[i].url).toString()) || reg.test(imageArr.url)
      let promise =
        (isImg == 'true' && this._loadImage(imageArr[i])) || this._loadAudio(imageArr[i])
      promiseArr.push(promise)
      promise
        .then(data => {
          currentIndex++
          if (isFunction(callback)) {
            callback(currentIndex, this.total)
          }
        })
        .catch(err => console.log(err))
    }
    return promiseArr
  },
  _loadImage (imageData) {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = () => {
        resolve(imageData)
      }
      if (isObject(imageData)) {
        image.src = imageData.url
      } else {
        image.src = imageData
      }
      image.onerror = () => {
        reject(imageData)
      }
    })
  },
  _loadAudio (audioData) {
    return new Promise((resolve, reject) => {
      let audio = new Audio()
      audio.src = (isObject(audioData) && audioData.url) || audioData
      audio.addEventListener(
        'canplaythrough',
        function () {
          resolve(audioData)
        },
        false
      )
      audio.addEventListener(
        'error',
        function () {
          reject(audioData)
        },
        false
      )
    })
  }
}

const resloader = options => {
  if (!isObject(options)) {
    throw new TypeError('Expected an object')
  } else {
    if (!isArray(options.resources)) {
      throw new TypeError('options.resources Expected an Array or JSON')
    } else {
      resLoaderObj.start(options)
    }
  }
}

module.exports = resloader
