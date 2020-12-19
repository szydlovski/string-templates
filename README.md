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
const template = '${what} ${what} ${what} happened';
const values = { what: 'that' };
interpolateStringTemplate(template, values); // "that that that happened"

// whitespace around properties is ignored
const template1 = 'I will ${   when   } forget the day';
// all valid property names are supported
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
  }
}
interpolateStringTemplate(template, values);
// "I will never forget the day when my dog finally learned to fetch, what a great day!"

// comes with a handy factory function
const { stringTemplateFactory } = require('@szydlovski/string-templates');

const greetingTemplate = stringTemplateFactory('Hello, my name is ${name}');
greetingTemplate({ name: 'Rachel Ochmonek' }); // "Hello, my name is Rachel Ochmonek"
```