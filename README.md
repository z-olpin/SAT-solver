# SAT-solver

An exhaustive algorithm for determining Boolean Satisfiability of a given formula and returning all valid solutions.

### Formulas

Formulas take the form of nested objects or strings where every string represents a Boolean variable.

A simple example of a formula:

```javascript
{
  and: [
    'SMALL',
    {or: [
      'BLUE',
      'GREEN'
    ]},
    {and: [
    {not: 'GREEN'},
    'ROUND'
    ]},
    {not: 'LARGE'}
  ]
}
 ```
 
 And its solution:
 
 ```javascript
 { SMALL: true, BLUE: true, GREEN: false, ROUND: true, LARGE: false }
 ```
 
 ### Operator objects:
 
 * AND: An array of Boolean values or expressions. Can be any length.
 * OR: An array of Boolean values or expressions. Must be of length 2.
 * NOT: A string representing a variable
