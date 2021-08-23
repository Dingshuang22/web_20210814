import brh from '@/utils/brh'

export function getToken() {
  return brh.storageGet('token')
}

export function setToken(token) {
  return brh.storageSet({ token })
}

export function removeToken() {
  return brh.storageRemove('token')
}

export function getLock() {
  return brh.storageGet('lock')
}

export function setLock(lock) {
  return brh.storageSet({ lock })
}
export function removeLock() {
  return brh.storageRemove('lock')
}