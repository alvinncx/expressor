import { createSelector } from 'reselect'
import { reduceScope } from '../utils'


const getVariable = state => state.variables
const getConstants = state => state.constants

const getScope = createSelector(
  getVariable,
  getConstants,
  (variables, constants) => {
    return reduceScope(variables, constants)
  }
)

const getExpression = state => state.expression.expression

export {
  getScope,
  getConstants,
  getExpression
}