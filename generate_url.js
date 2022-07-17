const mongoose = require('mongoose')

// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define generateUrl function
function generateUrl(url) {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))

  // start generating url
  let newUrl = ''
  for (let i = 1; i <= 5; i++) {
    newUrl += sample(collection)
  }

  // return the generated newUrl
  return newUrl
}

// export generateUrl function for other files to use
module.exports = generateUrl