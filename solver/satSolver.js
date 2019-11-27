module.exports = {
  solve: function(formula) {

    // Exhaustive traversal of formula, returning all its variables 
    const allVars = formula => {
      if (typeof formula === 'string') return [formula] // variable
      if (formula.not) return allVars(formula.not) // negated literal
      if (formula.and) return Array.from(new Set(formula.and.map(v => allVars(v)).flat())).sort() // conjunction
      if (formula.or) return Array.from(new Set(formula.or.map(v => allVars(v)).flat())).sort() // disjunction
    }

    // Descend through clauses of formula tree and determine whether a set of assignments satisfies formula 
    const isTrue = (formula, assignments) => {
      if (typeof formula === 'string') return assignments[formula]
      if (formula.not) return !isTrue(formula.not, assignments)
      if (formula.and) return !formula.and.map(v => isTrue(v, assignments)).includes(false)
      if (formula.or) return formula.or.map(v => isTrue(v, assignments)).includes(true)
    }

    // Returns array of objects, collectively representing all possible assignments
    const possibleAssignments = vars => {
      let numVars = vars.length
      // Count in binary up to possibleStates ^ numVars
      let assignments = [...Array(Math.pow(2, numVars)).keys()]
        .map(i => (i >>> 0).toString(2).padStart(numVars, '0')) // Use bit shift to make binary string representation -> '010'
        .map(s => s.split('').map(n => (n === '0') ? false : true)) // Convert binary string to array of bools -> [false, true, false]
        .map(r => Object.fromEntries(r.map((v,i) => [vars[i], v]))) // -> {'var1': false, 'var2': true, 'var3': false}
      return assignments
    }

    // Try all assignments and return all valid solutions
    let solutions = []
    for (let assignment of possibleAssignments(allVars(formula))) {
      if (isTrue(formula, assignment)) {
        solutions.push(assignment)
      }
    }
    return solutions.length >= 1 ? solutions : 'Formula has no solution'
  }
}