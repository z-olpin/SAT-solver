const satSolver = require("../satSolver")
const formulas = require("./formulas")


formulas.formulas.map((f, i) => {
  console.log(`Formula ${++i} solutions:`,satSolver.solve(f))
})