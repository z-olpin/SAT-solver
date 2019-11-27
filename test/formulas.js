module.exports = {
  formulas: [
    // Scheduling Saturday and Sunday AM and PM shifts
    // Alice requires either all-day Saturday or all-day Sunday off.
    {and: [
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
    ]},
    // misc formulas
    {and: ['a', {not: 'c'}, {or: [{not: 'b'}, 'b']}, {or:[{not: 'c'}, {and: ['c', 'd']}]}, {and: ['d', 'e', {or: ['a', 'b']}]}, {or: [{not: 'a'}, {and: [{not: 'b'}, {or: ['b', 'd']},'e']}]}]},
    {and: [{or: [{and: [{or: ['a', {and: ['b', {and: [{not: 'c'}, 'd']}]}]}, 'a', {and: [{not: 'c'}, {not: 'a'}]}, {not: {or: ['e', 'd']}}]}, 'c']}, {and: [{and: [{not: 'b'}, 'a', {and: ['c', {not: 'b'}, {not: 'd'}]}]}, {and: [{not: 'd'}, 'c']}]}]},
    {or: [{and: [{and: [{and: ['a', {not: 'b'}]}, 'c']}, {not: 'b'}, {or: ['e', {and: ['c', {not: 'd'}]}]}]}, {and: [{and: ['b', 'd', {not: 'b'}, {not: 'a'}]}]}]},
    {and: [{and: ['a', {not:'e'}, 'f', {not: 'g'}]}, {and: ['a', 'b', 'd', {not: 'e'}]}, {or: ['b', 'c']}, 'd', {or: [{not: 'a'}, {or: [{and: ['f', 'a']}, 'c']}]}]}
  ]
}