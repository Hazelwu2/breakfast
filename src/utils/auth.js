import Cookies from 'js-cookie'

const TokenKey = 'username';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // new Date(new Date().getTime() + 1 * 60 * 1000，每一分鐘
  return Cookies.set(TokenKey, token, { expires: 0.8 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
