// Rules
// - Dilarang menggunakan fungsi sort dari JS
// - Minimal 1 fungsi asc / desc
// - Dilarang menggunakan fungsi selain loop dan if condition hampir di semua logic
// - Dilarang memakai push() dan concat()

const array = ['Wulan','Raharjo',"Widya",10,9,102,66,5421,1,0,'Yuda','Cinta','Iskandar','Hidayat','Kusuma','Indah','Jusuf']

// parameter type is for conditional sorting: 'asc' === ascending : 'desc' === descending
// default sorting is descending
function customSort (arr, type) {
  const numArr = []
  const strArr = []
  let length = 0

  // looping to break into type
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      strArr[strArr.length] = arr[i]
    } else {
      numArr[numArr.length] = arr[i]
    }
  }

  // conditional to search which array is the longest for looping
  length = numArr.length > strArr.length ? numArr.length : strArr.length

  // lopping for sorting
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {

      // conditional for sorting ascending or descendant
      if (type === 'asc') {

        // conditional for which array to sorting
        if (numArr[i] > numArr[j]) {
          [numArr[i],numArr[j]] = [numArr[j], numArr[i]]
        } else if (strArr[i] > strArr[j]){
          [strArr[i],strArr[j]] = [strArr[j], strArr[i]]
        }
      } else {

        // conditional for which array to sorting
        if (numArr[i] < numArr[j]) {
          [numArr[i],numArr[j]] = [numArr[j], numArr[i]]
        } else if (strArr[i] < strArr[j]){
          [strArr[i],strArr[j]] = [strArr[j], strArr[i]]
        }
      }
    }
  }

  // concat array string to array number
  for (let i = 0; i < strArr.length; i++) {
    numArr[numArr.length] = strArr[i]
  }

  // return array number after concat
  return numArr
}

console.log(customSort(array, 'desc'))
console.log(customSort(array, 'asc'))