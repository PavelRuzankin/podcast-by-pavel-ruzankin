const getRequestUrl = (url) => `https://podcast-by-pavel-ruzanki-6feff.firebaseio.com/${url}`

export function requestServer( method, url, data = null){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, getRequestUrl(url))

        xhr.responseType = "json"
        xhr.setRequestHeader("Content-type", "application/json")

        xhr.onload = () => {
            if(xhr.status > 400){
                reject(xhr.response)
            }else{
                resolve(xhr.response)
            }
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send(JSON.stringify(data))
    })
}