import store from "store"
import math from "mathjs"
import { uniqueId, evaluateTwoSidedInequality, findInequalityPositions } from './utils'

var Storage = {
  save: function(){
    store.set('variables', Variable.list)
    store.set('expression', Expression.expression)
    store.set('title', Meta.title)
    store.set('description', Meta.description)
    store.set('uniqueId', uniqueId())
    alert('saved!')
  },
  clear: function(){
    store.clearAll()
    // confirm('This will clear all data saved locally. Are you sure?') ? location.reload() : ""
  }
}

var Meta = {
  title: store.get('title') || "Calculator",
  description: store.get('description') || "Formula lets you calculate speed",
  updateTitle: (value) => {
    Meta.title = value
    console.log(Meta.title)
  },
  updateDescription: (value) => {
    Meta.description = value
  }
}

// Variable model
var Variable = {
  list: [],
  loadList: function(){
    Variable.list = store.get('variables') || [
      { 
        id: uniqueId(), 
        name: "d", 
        value: 100, 
        label: 'Displacement',
        type: 'variable',
        config: {
          step: 10
        }
      },
      { 
        id: uniqueId(), 
        name: "t", 
        value: 30 , 
        label: 'Time',
        type: 'variable',
        config: {
          step: 10
        }
      },
      { 
        id: uniqueId(), 
        name: "C", 
        value: 1.45 , 
        label: 'Constant',
        type: 'conditional',
        // Only takes one configuration
        config: {
          conditions: [
            // Assess security of these statements, maybe escape
            { id: uniqueId(), statement: "d < 0", value: "0" },
            { id: uniqueId(), statement: "0 <= d < 100", value: "1.45 * t" },
            { id: uniqueId(), statement: "100 <= d < 500", value: "2.58" },
          ],
          current_true_id: undefined,
          default: "3 t"
        }
      }
    ]
  },
  scope: {},
  reduce: function(){
    Variable.scope = {}
    Variable.list.forEach(variable => {
      Variable.scope[variable.name] = Number(variable.value)
    })
    return Variable.scope
  },
  setValue: function(id, value){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    isNaN(value) ? found.error = true : found.error = false
    found.value = value
  },
  setName: function(id, name){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    found.name = name
  },
  setLabel: function(id, label){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    found.label = label
  },
  evaluateConditionalStatement: function(id){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    if (!found) return
    
    let trueCondition = found.config.conditions.find(function(condition){
      if (findInequalityPositions(condition.statement).length > 1 ){    
        return evaluateTwoSidedInequality(condition.statement, Variable.reduce())
      } else {
        return math.eval(condition.statement, Variable.reduce())
      }
    })
    
    if (!trueCondition){
      Variable.setValue(id, math.eval(found.config.default, Variable.reduce()) )
      Variable.setCurrentConditional(id, undefined)
    } else {
      Variable.setValue(id, math.eval(trueCondition.value, Variable.reduce()) )
      Variable.setCurrentConditional(id, trueCondition.id)
    }

  },
  evaluateAllConditionals: function(){
    Variable.list.filter(variable => {
        return variable.type == 'conditional'
      }).forEach(function(variable2){
        Variable.evaluateConditionalStatement(variable2.id)
      })
  },
  setCurrentConditional: function(id, condition_id){
    var found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    found.config.current_true_id = condition_id
  },
  setConditionValue: function(var_id, cond_id, value){
    var found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == var_id
    })
    found = found.config.conditions.find(cond => {
      return cond.id == cond_id
    })
    found.value = value
    Variable.evaluateConditionalStatement(var_id)
  },
  setConditionStatement: function(var_id, cond_id, statement){
    var found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == var_id
    })
    found = found.config.conditions.find(cond => {
      return cond.id == cond_id
    })
    found.statement = statement
    Variable.evaluateConditionalStatement(var_id)
  },
  setConditionDefaultStatement: function(var_id, statement){
    var found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == var_id
    })
    found.config.default = statement
    Variable.evaluateConditionalStatement(var_id)
  },
  newVariable: function(){
    Variable.list.push({
      id: uniqueId(), 
      name: "", 
      value: undefined,
      type: 'variable',
      config: {
          step: 10
      }
    })
  },
  newConditional: function(){
    Variable.list.push({
      id: uniqueId(), 
      name: "", 
      value: undefined,
      type: 'conditional',
      config: {
        conditions: [
          // Assess security of these statements, maybe escape
          { id: uniqueId(), statement: "d < 0", value: "0" },
          { id: uniqueId(), statement: "100 <= d < 500", value: "2.58" },
        ],
        current_true_id: undefined,
        default: "1.5"
      }
    })
  },
  newStatement: function(var_id){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == var_id
    })
    found.config.conditions.push({
      id: uniqueId(), 
      statement: "100 <= d < 500", 
      value: "2.58"
    })
  },
  removeVariable: function(id){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    Variable.list.splice(Variable.list.indexOf(found), 1)
  },
  removeStatement: function(var_id, cond_id){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == var_id
    })
    let cond = found.config.conditions.find(cond => {
      return cond.id == cond_id
    })
    found.config.conditions.splice(found.config.conditions.indexOf(cond), 1)
  },
  increase: function(id, step=10){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    Variable.setValue(id, Number(found.value) + step)
    
  },
  decrease: function(id, step=10){
    let found = Variable.list.find(variable_to_find => {
      return variable_to_find.id == id
    })
    Variable.setValue(id, Number(found.value) - step)

  },
}

var Expression = {
  expression: "",
  result: 0,
  editing: false,
  load: function(){
    Expression.expression = store.get('expression') ||  "C * d / t"
  },
  eval: function(){
    Variable.evaluateAllConditionals()
    Expression.result = math.eval(Expression.expression, Variable.reduce())
  },
  updateExpression: function(v){
    Expression.expression = v
  },
  toggleEditing: function(){
    Expression.editing = !Expression.editing
  }
}

export {
  Storage,
  Meta,
  Variable,
  Expression
}