var expect = chai.expect;

var Color = require('randomcolor'),
    Person = require('../../src/models/person');

var get_person = function () {
    // get a specific person for testing
    var color = Color.randomColor();
    return new Person({seed: 'eric', color: color});
}

describe('Model: Person', function () {
    var person, expected;
    before(function (done) {
        person = get_person();
        person.fetch({
            success: function (data) {
                person = data;
                done();
            }
        });
    });

    it('Person should have a url', function() {
        expect(person).to.have.property('url');
    });
    it('Person should have a color', function() {
        expect(person).to.have.property('color');
    });
    it('Person should have a formatted name', function() {
        expected = 'Mr Corey Castillo';
        expect(person.name()).to.equal(expected);
    });
    it('Person should have a formatted location', function() {
        expected = '3447 Pockrus Page Rd, Ironville, New jersey, 65776';
        expect(person.location()).to.equal(expected);
    });
    it('Person should have a formatted dob', function() {
        expected = '7 Jul 1981 (33 years old)';
        expect(person.dob()).to.equal(expected);
    });
});