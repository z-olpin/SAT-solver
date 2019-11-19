module.exports = {
  solve: function(formula) {

    const allVars = formula => {
      if (typeof formula === 'string') return [formula]
      if (formula.not) return allVars(formula.not)
      if (formula.and) return Array.from(new Set(formula.and.map(v => allVars(v)).flat()))
      if (formula.or) return Array.from(new Set(formula.or.map(v => allVars(v)).flat()))
    }

    const isTrue = (formula, assignments) => {
      if (typeof formula === 'string') return assignments[formula]
      if (formula.not) return !isTrue(formula.not, assignments)
      if (formula.and) return !formula.and.map(v => isTrue(v, assignments)).includes(false)
      if (formula.or) return formula.or.map(v => isTrue(v, assignments)).includes(true)
    }

    // Returns array of all possible boolean assignments from array of variables
    const possibleAssignments = vars => {

      let numVars = vars.length 
      let columns = []
      
      // Permutation table for variables A, B: 
      //     A  B
      //     ----
      //     T  T
      //     T  F
      //     F  T
      
      // Build 2D array representing *columns* of a permutation table
      for (let colLength = Math.pow(2, numVars); colLength > 1; colLength /= 2) {
        let column = []
        while (column.length < Math.pow(2, numVars)) {
          for (let i = 0; i < colLength / 2; i++) {
            column.push(true)
          }
          for (let i = 0; i<colLength / 2; i++) {
            column.push(false)
          }
        }
        columns.push(column)
      }
      
      // Transpose columns into rows of permutation table
      // and create an assignments object from each e.g. {A: false, B: true, C: false}
      let assignments = []
      for (let i = 0; i < Math.pow(2, numVars); i++) {
        assignments.push(Object.fromEntries(columns.map(c => c[i]).map((v,i) => [vars[i], v])))
      }
      return assignments
    }

    // Test all assignments and return valid solutions
    let solutions = []
    for (let assignment of possibleAssignments(allVars(formula))) {
      if (isTrue(formula, assignment)) {
        solutions.push(assignment)
      }
    }
    return solutions.length > 1 ? solutions : 'Formula has no solution'
  }
}