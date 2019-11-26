const satSolver = require("../solver/satSolver")
const formulas = require("./formulas")


formulas.formulas.map((f, i) => {
  let solution = satSolver.solve(f)
  console.log(`Formula ${i + 1} solutions:`, solution, solution.length)
})