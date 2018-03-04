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
      type: 'variable',
      // Configurations
      step: 10
    },
  ],
  constants: [
    { 
      id: uuidv1(), 
      name: "C", 
      value: 1.45 , 
      label: 'Constant',
      type: 'conditional',
      // Only takes one configuration
      config: {
        conditions: [
          // Assess security of these statements, maybe escape
          { id: uuidv1(), statement: "d < 0", value: "0" },
          { id: uuidv1(), statement: "0 <= d < 100", value: "1.45 * t" },
          { id: uuidv1(), statement: "100 <= d < 500", value: "2.58" },
        ],
        current_true_id: undefined,
        default: "3 t"
      }
    }
  ],
  expression: {
    expression: "C * t",
    result: 0,
  }
}

export default initialState