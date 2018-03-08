import { createSelector } from 'reselect'
import { reduceScope } from '../utils'


const getVariable = state => state.variables
const getConstants = state => state.constants

const getScope = createSelector(
  getVariable,
  getConstants,
  (variables, constants) => {
    return [...variables, ...constants].reduce(
      (accumulator, currentValue, currentIndex, input) => {
        accumulator[currentValue.name] = currentValue.value
        return accumulator
      }, {}
    )
  }
)

const getExpression = state => state.expression.expression

export {
  getScope,
  getConstants,
  getExpression
}