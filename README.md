# SAT-solver

An exhaustive algorithm for determining Boolean Satisfiability of a given formula and returning all valid solutions.

## Formulas

Formulas take the form of boolean objects (BOBs) representing the formula's constraints.
BOB: { key (AND|OR|NOT): value (string|array) } 

AND  ->  An array of strings or BOBs. It may be of any length.

OR   ->  An array of strings or BOBs. The array must be of length 2.

NOT  ->  A string. 

## Examples

The formula `{OR: ["pretty old", {AND: ["strange", "very hairy"]}}` is a BOB representing (probably) somebody's idea of what constitutes an acceptable romantic partner. Suitor A, who is strange and hairy is acceptable. Suitor B, who is *very* hairy, but neither old nor strange, will not do. 

Examples of simple formulas:

```javascript
{NOT: "crowded"}
```

```javascript
{OR: ["free", {OR: ["cheap", {OR: ["useful", "beautiful"]}]}}
```

```javascript
{AND: ["SMALL", {OR: ["BLUE", "GREEN"]}, {AND: [{NOT: "GREEN"}, "ROUND"]}, {NOT: "LARGE"}]}
 ``` 

## SOLVER

This solver returns all valid solutions to a formula. The last formula's only valid solution, for example:
 
 ```javascript
 { SMALL: true, BLUE: true, GREEN: false, ROUND: true, LARGE: false }
 ```

