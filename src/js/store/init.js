import uuidv1 from "uuid"

const initialState = {
  meta: {
    title: "Calculator",
    description: "This is an awesome programmable calculator!"
  },
  variables: [
    { 
      id: uuidv1(), 
      name: "t", 
      value: 30 ,
      label: 'Time',
      // Configurations
      step: 10
    },
  ],
  constants: [
    { 
      id: uuidv1(), 
      name: "C", 
      // Derived from conditions
      value: 1.45 , 
      label: 'Constant',
      // Configurations
      conditions: [
        // Assess security of these statements, maybe escape
        { id: uuidv1(), statement: "t < 0", expression: "0" },
        { id: uuidv1(), statement: "0 <= t < 100", expression: "1.45 * t" },
        { id: uuidv1(), statement: "100 <= t < 500", expression: "2.58" },
      ],
      trueConditionId: undefined,
      default: "3 t"
    }
  ],
  expression: {
    expression: "C * t",
    result: 0,
  }
}

export default initialState