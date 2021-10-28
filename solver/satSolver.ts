type Variable = string;

type AssignmentSet = Record<string, Boolean>;

interface Formula {
    and?: Array<Variable | Formula>;
    or?: Array<Variable | Formula>;
    not?: Variable | Formula;
}

// Exhaustive traversal of formula, returning all its variables
const allVars = (formula: Formula | string): string[] => {
    if (typeof formula === 'string') return [formula]; // variable
    if (formula.not) return allVars(formula.not); // negated literal
    if (formula.and) {
        return Array.from(
            new Set(formula.and.map(v => allVars(v)).flat())
        ).sort();
    }
    if (formula.or) {
        return Array.from(
            new Set(formula.or.map(v => allVars(v)).flat())
        ).sort();
    }
    return [];
}

// Descend through clauses of formula tree and determine whether a set of assignments satisfies formula
const isTrue = (formula: Formula | string, assignments: Record<string, any>): Boolean => {
    if (typeof formula === 'string') return assignments[formula];
    if (formula.not) return !isTrue(formula.not, assignments);
    if (formula.and) {
         return !formula.and
             .map(v => isTrue(v, assignments))
             .includes(false);
    }
    if (formula.or) {
         return formula.or
             .map(v => isTrue(v, assignments))
             .includes(true);
    }
    return false;
}

const possibleAssignments = (variables: Array<string>): Array<AssignmentSet> => {
    const numVars = variables.length;
    return [...Array(Math.pow(2, numVars)).keys()];
        // Use bit shift to make binary string representation -> '010'
        .map((i) => {
            return (i >>> 0)
                .toString(2)
                .padStart(numVars, '0');
        })
        // Convert binary string to array of bools -> [false, true, false]
        .map((s) => {
            return s
                .split('')
                .map(n => (n !== '0'));
        })
        .map((r) => {
            return Object.fromEntries(
                r.map((v, i) => [variables[i], v]));
        })
}

const solve = (formula: Formula): Array<AssignmentSet> => {
    const solutions = [];
    for (let assignment of possibleAssignments(allVars(formula))) {
        if (isTrue(formula, assignment)) {
            solutions.push(assignment);
        }
    }
    return solutions;
}

const formulas: Array<Formula> = [
    // No valid solutions
    {and: ['a', {not: 'a'}]},
    // Scheduling Saturday and Sunday AM and PM shifts
    // Alice requires either all-day Saturday or all-day Sunday off.
    {
        and: [
            {or: [{not: 'Alice13'}, {not: 'Alice11'}]},
            {or: [{not: 'Alice14'}, {not: 'Alice12'}]},
            {or: [{not: 'Alice13'}, {not: 'Alice12'}]},
            {or: [{not: 'Alice11'}, {not: 'Alice14'}]},
            // Bob can't work evenings
            {not: 'Bob12'},
            {not: 'Bob14'},
            // Charlie only works Saturdays
            {not: 'Charlie13'},
            {not: 'Charlie14'},
            // Every employee must work at least one shift
            {or: [{or: ['Alice11', 'Alice12']}, {or: ['Alice13', 'Alice14']}]},
            {or: [{or: ['Bob11', 'Bob12']}, {or: ['Bob13', 'Bob14']}]},
            {or: [{or: ['Charlie11', 'Charlie12']}, {or: ['Charlie13', 'Charlie14']}]},
            // Every shift must be covered
            {or: [{or: ['Alice11', 'Bob11']}, {or: ['Charlie11', 'Bob11']}]},
            {or: [{or: ['Alice12', 'Bob12']}, {or: ['Charlie12', 'Bob12']}]},
            {or: [{or: ['Alice13', 'Bob13']}, {or: ['Charlie13', 'Bob13']}]},
            {or: [{or: ['Alice14', 'Bob14']}, {or: ['Charlie14', 'Bob14']}]}
        ]
    },
    // misc formulas
    {and: ['a', {not: 'c'}, {or: [{not: 'b'}, 'b']}, {or: [{not: 'c'}, {and: ['c', 'd']}]}, {and: ['d', 'e', {or: ['a', 'b']}]}, {or: [{not: 'a'}, {and: [{not: 'b'}, {or: ['b', 'd']}, 'e']}]}]},
    {and: [{or: [{and: [{or: ['a', {and: ['b', {and: [{not: 'c'}, 'd']}]}]}, 'a', {and: [{not: 'c'}, {not: 'a'}]}, {not: {or: ['e', 'd']}}]}, 'c']}, {and: [{and: [{not: 'b'}, 'a', {and: ['c', {not: 'b'}, {not: 'd'}]}]}, {and: [{not: 'd'}, 'c']}]}]},
    {or: [{and: [{and: [{and: ['a', {not: 'b'}]}, 'c']}, {not: 'b'}, {or: ['e', {and: ['c', {not: 'd'}]}]}]}, {and: [{and: ['b', 'd', {not: 'b'}, {not: 'a'}]}]}]},
    {and: [{and: ['a', {not: 'e'}, 'f', {not: 'g'}]}, {and: ['a', 'b', 'd', {not: 'e'}]}, {or: ['b', 'c']}, 'd', {or: [{not: 'a'}, {or: [{and: ['f', 'a']}, 'c']}]}]},
    // deep call stack
    {
        and: [
            "orange",
            "sad",
            "nice",
            "nokay",
            {
                not: "ugly"
            },
            {
                not: "no"
            },
            {
                and: [
                    {
                        not: "well"
                    },
                    {
                        or: [
                            "nokay",
                            "ugly"
                        ]
                    }
                ]
            },
            "big",
            {
                not: "green"
            },
            "blue",
            {
                or: [
                    {
                        and: [
                            {
                                not: {
                                    and: [
                                        "nokay",
                                        "ugly"
                                    ]
                                }
                            }, "big", "brown", "sad", {
                                or: [
                                    {
                                        not: "blue"
                                    },
                                    "nokay",
                                    "okay",
                                    {
                                        or: [
                                            "okay",
                                            {
                                                and: [
                                                    "big",
                                                    "okay",
                                                    "no"
                                                ]
                                            },
                                            {
                                                not: "no"
                                            }
                                        ]
                                    },
                                    {
                                        not: {
                                            or: [
                                                {
                                                    and: [
                                                        "brown",
                                                        "orange",
                                                        "blue",
                                                        {
                                                            or: [
                                                                "orange",
                                                                "blue"
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "grey",
                                                "ugly",
                                                {
                                                    and: ["ugly", "well"]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            "nice",
                            "green"
                        ]
                    },
                    "green",
                    "okay"
                ]
            },
            {
                not: "grey"
            }
        ]
    }
]

const logEm = (formulas: Array<Formula>): void => {
    formulas.forEach((formula, i) => {
        let solution = solve(formula);
        console.log(`Formula ${i + 1} has ${solution.length} valid solutions:`, solution ?? []);
    })
}

logEm(formulas);
