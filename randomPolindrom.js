function polindrom (n) {
  // declare character for polindrom
  const char = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  // for looping until 1/2 polindrom
  let center = n % 2 === 0 ? n/2 : (n + 1)/2
  for (let i = center; i > 0; i--) {
    result += char[Math.floor(Math.random() * char.length)]
  }

  // for looping to complete polindrom
  center = n % 2 === 0 ? center - 1 : center - 2
  for (let i = center; i >= 0; i--) {
    result += result[i]
  }
  
  return result
}

console.log(polindrom(14))
console.log(polindrom(87))
console.log(polindrom(2))
console.log(polindrom(5))
console.log(polindrom(9))
console.log(polindrom(1))