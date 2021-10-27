# SAT-solver

This is an exhaustive algorithm for determining Boolean Satisfiability of a given formula. The solver also returns all valid solutions to the formula.

## What is "Boolean Satisfiability"?
 
> *In logic and computer science, the Boolean satisfiability problem (sometimes abbreviated SAT) is the problem of determining if there exists an interpretation that satisfies a given Boolean formula. In other words, it asks whether the variables of a given Boolean formula can be consistently replaced by the values TRUE or FALSE in such a way that the formula evaluates to TRUE. If this is the case, the formula is called satisfiable. On the other hand, if no such assignment exists, the function expressed by the formula is FALSE for all possible variable assignments and the formula is unsatisfiable. For example, the formula "a AND NOT b" is satisfiable because one can find the values a = TRUE and b = FALSE, which make (a AND NOT b) = TRUE. In contrast, "a AND NOT a" is unsatisfiable.*

Thanks [Wikipedia](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem)!

## Formulas

```typescript

type Variable = string;

interface Formula {
  AND?: Array<Variable | Formula>;
  OR?: Array<Variable | Formula>;
  NOT?: Variable;
};
```

The solver takes a `Formula` as input. A formula may have any or all of the properies `AND`, `OR`, and `NOT`, which–with their values–represent clauses. `AND` is a conjunction, `OR` is a disjunction, and `NOT` is a negation. The `AND` and `OR` properties must have an array (of any length) as their value which may contain string literals or a `Formula`. `NOT` must have a string literal or `Formula` as its' value. Note that a `Formula` may contain arbitrarily deeply-nested formulas. Each string literal in a `Formula` represents a `Variable` whose Boolean value is implicitly `True`.

### Example

Here, `f` is an example of a valid formula:

```typescript
const f: Formula = {
  OR: [
    "pretty old",
    {
      AND: [
        "strange",
        "very hairy"
      ]
    }
  ]
}
```

This particular example is a formula which describes what constitutes the ideal romantic partner to my friend Larry. Suitor A, who is strange and very hairy, but not old, satisifes this formula for an ideal romantic partner. Suitor B, who is pretty old, but neither strange nor hairy, also satisfies the formula. Suitor C who is very hairy, but neither old nor strange, does not. 

### Some more examples of simple formulas:

```typescript
const f1: Formula = { NOT: "crowded" };
```

```typescript
const f2: Formula = { AND: ["hot", { NOT: "humid" }] };
```

```typescript
const f3: Formula = {
  OR: [
    "free",
    {
      OR: [
        "cheap",
        {
          OR: ["useful", "beautiful"]
        }
      ]
    }
  ]
}
```

```typescript
const f4: Formula = {
  AND: [
    "BLUE",
    "SMALL",
    {
      OR: [
        "BLUE",
        "GREEN"
      ]
    },
    {
      AND: [
        {
          NOT: "GREEN"
        },
        "ROUND"
      ]
    },
    {
      NOT: "LARGE"
    }
  ]
}
 ``` 

## The SOLVER

This solver returns all valid solutions to a formula. If the solver returns no valid solutions for a formula, the formula is said to be "unsatisifable". That is, no possible set of variable assignments can be evaluated as `True` with the given formula. The only valid solution from the last exmaple:
 
 ```typescript
 solve(f4); // -> { SMALL: true, BLUE: true, GREEN: false, ROUND: true, LARGE: false }
 ```

