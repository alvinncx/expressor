import math from "mathjs"

const evaluateTwoSidedInequality = function(statement, scope){
  var pos = findInequalityPositions(statement)

  var str1 = statement.slice(0, pos[1].index )
  var str2 = statement.slice(pos[0].index + pos[0].symbol.length, statement.length )

  var state1 = math.eval(str1, scope)
  var state2 = math.eval(str2, scope)

  if (!state1 || !state2 ) return false
  return state1 === state2 
}

const findInequalityPositions = function(statement){
  var myRe = /(<=|<|>=|>)/g; var pos = []; var counter = 0;
  let matches = statement.match(myRe)
  matches.forEach(function(match){
    pos.push({ 
        index: statement.indexOf(match, counter === 0 ? 0 : pos[counter-1].index + 1),
        symbol: match
      })
    ++counter
  })
  return pos
}

const evaluateConditionalStatement = function(condition, scope){
  if (findInequalityPositions(condition.statement).length > 1 ){    
    return evaluateTwoSidedInequality(condition.statement, scope)
  } else {
    return math.eval(condition.statement, scope)
  }
}

const resolveConditions = function(constant, scope){
  let trueCondition = constant.conditions.find((condition) => {
    return evaluateConditionalStatement(condition, scope)
  })

  return { 
    value: trueCondition ? math.eval(trueCondition.expression, scope) : math.eval(constant.default, scope), 
    trueConditionId: trueCondition ? trueCondition.id : undefined
  }
} 

const resolveConstantValues = (state, action, scope) => {
  return state.map((item, index) => {
      if (index !== action.index) return item
      return {
        ...resolveConditions(item, scope),
      }
  })
}


export { 
  evaluateTwoSidedInequality,
  findInequalityPositions,
  resolveConditions,
  resolveConstantValues
}