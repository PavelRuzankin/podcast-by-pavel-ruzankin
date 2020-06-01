import { getLastAgo } from "./getLastAgo"

function findSmallest(arr){
    let smallest = arr[0]
    let smallestIndex = 0
    arr.forEach((elem, index) => {
        if(getLastAgo(elem.date, true) >= getLastAgo(smallest.date, true)){
            smallest = elem
            smallestIndex = index
        }
    });

    return smallestIndex
}

export function getSortArray(data){
    let items = data
    if(typeof data === "object"){
        items = Object.keys(data).map(elem => {
            return {...data[elem], id: elem}
        })
    }

    const sortedArray = []
    const length = items.length

    for(let i = 0; i < length; i++){
        let index = findSmallest(items)
        sortedArray.push(items[index])
        items.splice(index, 1)
    }
    
    return sortedArray
}