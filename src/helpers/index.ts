const capitalize = ([firstLetter, ...restString]: string) => {
  return firstLetter.toUpperCase() + restString.join('').toLowerCase()
}

export {
  capitalize
}
