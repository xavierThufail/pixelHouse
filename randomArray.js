// Rules
// - Dilarang menggunakan fungsi selain loop dan if condition hampir di semua logic

const stringArr = 'Wulan,Raharjo,Widya,Yuda,Cinta,Iskandar,Hidayat,Kusuma,Indah,Jusuf'

// create function for split string to array
const split = (str, param) => {
  let result = []
  let data = ''

  for (let i = 0; i < str.length; i++) {
    if (str[i] === param || i === str.length - 1) {
      result[result.length] = i === str.length - 1 ? data + str[i] : data
      data = ''
    } else {
      data += str[i]
    }
  }

  return result
}

function randomArray (i, x) {
  // split string
  let arr = split(stringArr, ',')
  let result = []
  
  // return error
  if (x > arr.length) return 'Total Data is not enough'

  // loop element array
  for (let j = 0; j < i; j++) {
    let data = ''
    let arrRandomIndex = []

    // loop total data in element array
    for (let k = 0; k < x; k++) {
      // generate random unique data per element
      while (arrRandomIndex.length <= k) {
        let unique = true
        let randomIndex = Math.floor(Math.random() * arr.length)
        for (let l = 0; l < arrRandomIndex.length; l++) {
          if (arrRandomIndex[l] === randomIndex) unique = false
        }
        if (unique) arrRandomIndex[k] = randomIndex
      }
      // push unique data to element
      if (data === '') {
        if (arr[arrRandomIndex[k]]) data += arr[arrRandomIndex[k]]
      } else {
        if (arr[arrRandomIndex[k]]) data += ' ' + arr[arrRandomIndex[k]]
      }
    }

    result[j] = data
  }

  return result
}

console.log(randomArray(2,10))
console.log(randomArray(1,5))
console.log(randomArray(3,9))
console.log(randomArray(8,2))
console.log(randomArray(10,11))