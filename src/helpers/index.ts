// Make first letter of given string in capital case, and other in lower case
const capitalize = ([firstLetter, ...restString]: string) => {
  return firstLetter.toUpperCase() + restString.join('').toLowerCase()
}

export {
  capitalize
}
