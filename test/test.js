const satSolver = require("../solver/satSolver")
const formulas = require("./formulas")


formulas.formulas.map((f, i) => {
  console.log(`Formula ${++i} solutions:`,satSolver.solve(f))
})