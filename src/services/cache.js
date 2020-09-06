export function setCache(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function getCache(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (err) {
    return null;
  }
}
