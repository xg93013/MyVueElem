import storage from 'good-storage'
function insertArr (arr, val, compareFn, maxLen = 15) {
  let index = arr.findIndex(compareFn)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // pop() 方法用于删除并返回数组的最后一个元素。
    arr.pop()
  }
}

function delArr (arr, compareFn) {
  let index = arr.findIndex(compareFn)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 获取
export const getStorage = key => {
  if (!key) return []
  return storage.get(key, [])
}

// 增加
export const localSave = (key, query) => {
  // 当前 localstorage 数组
  let searches = storage.get(key, [])
  insertArr(searches, query, (item) => {
    return item === query
  }, 15)
  storage.set(key, searches)
  return searches
}

// 删除
export const localDel = (key, query) => {
  // 当前 localstorage 数组
  let searches = storage.get(key, [])

  delArr(searches, (item) => {
    return item === query
  })

  storage.set(key, searches)
  return searches
}

// 清空
export const localClear = (key) => {
  storage.remove(key)
  return []
}
