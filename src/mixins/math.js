import * as math from 'mathjs'

export function add(){
  if ([...arguments].length !== 0 && [...arguments].every((item) => {
    return (!isNaN(parseFloat(item)) && isFinite(item)) ? true : false
  })) {
    let result = [...arguments].reduce((prev, cur) => {
      return math.number(math.add(math.bignumber(prev), math.bignumber(cur)))
    })
    return result
  } else {
    throw new Error("The Function add has no parameters or parameters is not of numeric type.")
  }
}

export function divide(){
  if ([...arguments].length !== 0 && [...arguments].every((item) => {
    return (!isNaN(parseFloat(item)) && isFinite(item)) ? true : false
  })) {
    let result = [...arguments].reduce((prev, cur) => {
      return math.number(math.divide(math.bignumber(prev), math.bignumber(cur)))
    })
    return result
  } else {
    throw new Error("The Function divide has no parameters or parameters is not of numeric type.")
  }
}

export function multiply(){
  if ([...arguments].length !== 0 && [...arguments].every((item) => {
    return (!isNaN(parseFloat(item)) && isFinite(item)) ? true : false
  })) {
    let result = [...arguments].reduce((prev, cur) => {
      return math.number(math.multiply(math.bignumber(prev), math.bignumber(cur)))
    })
    return result
  } else {
    throw new Error("The Function multiply has no parameters or parameters is not of numeric type.")
  }
}

export function subtract(){
  if ([...arguments].length !== 0 && [...arguments].every((item) => {
    return (!isNaN(parseFloat(item)) && isFinite(item)) ? true : false
  })) {
    let result = [...arguments].reduce((prev, cur) => {
      return math.number(math.subtract(math.bignumber(prev), math.bignumber(cur)))
    })
    return result
  } else {
    throw new Error("The Function subtract has no parameters or parameters is not of numeric type.")
  }
}