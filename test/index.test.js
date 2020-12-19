const {
	interpolateStringTemplate,
	stringTemplateFactory,
	StringTemplateError,
} = require('../src/string-templates.js');
const { expect } = require('chai');

describe('interpolateStringTemplate', function () {
	it('interpolates values into template strings', function () {
		expect(
			interpolateStringTemplate('Hello, my name is ${name}', { name: 'John' })
		).to.equal('Hello, my name is John');
	});
	it('fills all occurences of a slot', function () {
		expect(
			interpolateStringTemplate('Hello, my name is ${name} ${name} ${name}', {
				name: 'John',
			})
		).to.equal('Hello, my name is John John John');
	});
	it('fills multiple slots', function () {
		expect(
			interpolateStringTemplate('Hello, my name is ${name} ${lastname}', {
				name: 'John',
				lastname: 'Doe',
			})
		).to.equal('Hello, my name is John Doe');
	});
	it('only makes one replacement per property', function () {
    let getCalls = 0;
    const source = {
      get name() {
        getCalls++;
        return 'John';
      }
    };
    const interpolated = interpolateStringTemplate('Hello, my name is ${name} ${name} ${name}', source);
    expect(interpolated).to.equal('Hello, my name is John John John');
    expect(getCalls).to.equal(1);
  });
  it('recognizes valid property names', function() {
    expect(
			interpolateStringTemplate('Hello, my name is ${$name} ${_lastname} ${generation2}, I am an ${job-title}', { $name: 'John', _lastname: 'Smith', generation2: 'Jr.', 'job-title': 'engineer' }, {warn:true})
		).to.equal('Hello, my name is John Smith Jr., I am an engineer');
  })
  it('ignores surrounding whitespace in property names', function() {
    expect(
			interpolateStringTemplate('Hello, my name is ${   name   }', { name: 'John' })
		).to.equal('Hello, my name is John');
  })
  it('does not replace slots with missing values', function() {
    expect(
			interpolateStringTemplate('Hello, my name is ${name}', {})
		).to.equal('Hello, my name is ${name}');
  })
  it('does not modify the template if it contains no slots', function() {
    expect(
			interpolateStringTemplate('There are no slots here', {})
		).to.equal('There are no slots here');
  })
  it('throws an error if template is not a string', function() {
    expect(function() {
      interpolateStringTemplate(null, {})
    }).to.throw(StringTemplateError, 'Template must be a string.')
  })
  it('throws an error if values is not an object', function() {
    const nonObjects = ['string', 1, true, function(){}, NaN, undefined];
    for (const nonObject of nonObjects) {
      expect(function() {
        interpolateStringTemplate('', nonObject)
      }).to.throw(StringTemplateError, 'Values must be an object.')
    }
  })
  it('throws an error if a slot does not have a corresponding value, if options.throw === true', function() {
    expect(function() {
      interpolateStringTemplate('Hello, my name is ${name}', {}, {throw:true})
    }).to.throw(StringTemplateError, 'No value found for ${name}.')
  })
});

describe('stringTemplateFactory', function() {
  it('returns a function that interpolates a predefined template', function() {
    const greetingTemplate = stringTemplateFactory('Hello, my name is ${name}');
    expect(
			greetingTemplate({ name: 'John' })
		).to.equal('Hello, my name is John');
  })
})
