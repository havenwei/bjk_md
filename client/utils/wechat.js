const Promise = require('./bluebird')

function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

function checkSession () {
    return new Promise((resolve, reject) => {
        wx.checkSession({success: resolve, fail: reject})
    })
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

function getStorage (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}

function getLocation (type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type: type, success: resolve, fail: reject })
  })
}

function request (type) {
  return new Promise((resolve, reject) => {
    wx.request({ type: type, success: resolve, fail: reject })
  })
}

module.exports = {
  login,
  checkSession,
  getUserInfo,
  setStorage,
  getStorage,
  getLocation,
  original: wx
}
