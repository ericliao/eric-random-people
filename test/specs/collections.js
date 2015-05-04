var expect = chai.expect;

var Color = require('randomcolor'),
    People = require('../../src/collections/people');

describe('Collection: People', function () {
    var people, color_mapping, expected;
    before(function (done) {
        people = new People();
        color_mapping = people.generate(3, function (mapping) {
            color_mapping = mapping;
            done();
        });
    });

    it('People should have 3 people', function() {
        expect(people.length).to.equal(3);
    });

    it('color mapping should have 3 key:color items', function() {
        expect(_.size(color_mapping)).to.equal(3);
    });
});