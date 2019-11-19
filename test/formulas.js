module.exports = {
  formulas: [
    {and: ['a', {or: [{not: 'b'}, 'b']}, {or:[{not: 'c'}, {and: ['c', 'd']}]}, {and: ['d', 'e', {or: ['a', 'b']}]}, {or: [{not: 'a'}, {and: [{not: 'b'}, {or: ['b', 'd']},'e']}]}]},
    {and: [{or: [{and: [{or: ['a', {and: ['b', {and: [{not: 'c'}, 'd']}]}]}, 'a', {and: [{not: 'c'}, {not: 'a'}]}, {not: {or: ['e', 'd']}}]}, 'c']}, {and: [{and: [{not: 'b'}, 'a', {and: ['c', {not: 'b'}, {not: 'd'}]}]}, {and: [{not: 'd'}, 'c']}]}]},
    {or: [{and: [{and: [{and: ['a', {not: 'b'}]}, 'c']}, {not: 'b'}, {or: ['e', {and: ['c', {not: 'd'}]}]}]}, {and: [{and: ['b', 'd', {not: 'b'}, {not: 'a'}]}]}]},
    {and: [
      {and: [
        'a', {not:'e'}, 'f', {not: 'g'}
      ]},
      {and: [
        'a', 'b', 'd', {not: 'e'}
      ]},
      {or: ['b', 'c']},
      'd',
      {or: [
        {not: 'a'},
        {or: [
          {and: ['f', 'a']},
          'c'
        ]}
      ]}
    ]}
  ]
}