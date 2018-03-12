import uuidv1 from "uuid"

const initialState = {
  meta: {
    title: "Compound Interest Formula",
    description: "Here is a quick demo showing how expressor is used to for on-the-fly compound interest calculation."
  },
  variables: [
    { 
      id: uuidv1(), 
      name: "P", 
      value: 1000 ,
      label: 'Principle amount',
      // Configurations
      step: 10
    },
    { 
      id: uuidv1(), 
      name: "t", 
      value: 10 ,
      label: 'Time (in years)',
      // Configurations
      step: 5
    },
    { 
      id: uuidv1(), 
      name: "n", 
      value: 1 ,
      label: 'Number of times compounded in each t',
      // Configurations
      step: 10
    },
  ],
  constants: [
    { 
      id: uuidv1(), 
      name: "r", 
      // Derived from conditions
      value: 1 , 
      label: 'Interest rate',
      // Configurations
      conditions: [
        // Assess security of these statements, maybe escape
        { id: uuidv1(), statement: "P > 1000", expression: 0.025 },
      ],
      trueConditionId: undefined,
      default: 0.015
    }
  ],
  expression: {
    expression: "P * (1 + r/n) ^ (n * t)",
    result: 0,
  }
}

export default initialState