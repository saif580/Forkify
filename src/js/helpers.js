import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`))
    }, s * 1000)
  })
}

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)])
    const data = await res.json()
    //Throwing Error If res.ok is False
    if (!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data
  } catch (err) {
    //thowing error from 1 async function to another in model js
    throw err
  }
}
