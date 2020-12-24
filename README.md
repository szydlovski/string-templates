# string-templates

A basic implementation of string templates.

# Usage
```
npm install @szydlovski/string-templates
```
```javascript
const { interpolateStringTemplate } = require('@szydlovski/string-templates');

interpolateStringTemplate('Hello, my name is ${name}', { name: 'Jake' }); // "Hello, my name is Jake"

// works with dot paths
const template = 'Hello, my name is ${name.first} ${name.last}';
const values = { name: { first: 'Trevor', last: 'Ochmonek' } };
interpolateStringTemplate(template, values); // "Hello, my name is Trevor Ochmonek"

// replaces all occurences
const template = 'who let the dogs out? ${pronoun} ${pronoun} ${pronoun}';
const values = { pronoun: 'who' };
interpolateStringTemplate(template, values); // "who let the dogs out? who who who"

// whitespace around properties is ignored
const template1 = 'I will ${   when   } forget that time';

// any valid property names are fine
const template2 = ' when ${w-h-o} finally ${did what?}';

// except dots - they get treated as dot paths
const template3 = ', what a ${day.feelings-about} day!';

const template = template1 + template2 + template3;
const values = {
  when: 'never',
  'w-h-o': 'my dog',
  'did what?': 'learned to fetch',
  day: {
    'feelings-about': 'great'
  },
  // these will be ignored
  '   when   ': 'quickly',
  'day.feelings-about': 'terrible'
}

interpolateStringTemplate(template, values);
// "I will never forget that time when my dog finally learned to fetch, what a great day!"

// comes with a handy factory function

const { stringTemplateFactory } = require('@szydlovski/string-templates');

const greetingTemplate = stringTemplateFactory('Hello, my name is ${name}');

greetingTemplate({ name: 'Rachel Ochmonek' }); // "Hello, my name is Rachel Ochmonek"

// and some other helpers

const { isStringTemplate, getStringTemplateSlots } = require('@szydlovski/string-templates');

isStringTemplate('Hello'); // false
isStringTemplate('Hello, my name is ${name}'); // true

const template = 'Hello, my full name is ${firstName} ${lastName}';
getStringTemplateSlots(template); // ['firstName', 'lastName']

```

# CHANGELOG

## 0.1.2 - 2020-12-24

### Added

- `isStringTemplate` function that tests whether a string is a template
- `getStringTemplateSlots` function that returns an array of slot props for a template

### Changed

- `interpolateStringTemplate` throws `TypeError` instead of `StringTemplateError` when the arguments are invalid
- removed `throw` option from `interpolateStringTemplate`, it always throws a `StringTemplateError` if a slot does not have a corresponding value