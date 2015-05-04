/* @jsx React.DOM */
/* jshint ignore:start */
var expect = chai.expect;

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Color = require('randomcolor'),
    Person = require('../../src/models/person'),
    CardView = require('../../src/views/card');

var get_person = function () {
    // get a specific person for testing
    // we specify the seed ensuring what we expect is consistent
    var color = Color.randomColor();
    return new Person({seed: 'eric', color: color});
}

describe('View: Card', function () {
    var person, container, expected;

    before(function (done) {
        person = get_person();
        person.fetch({
            success: function (data) {
                person = data;
                done();
            }
        });
    });

    container = document.createElement('div');
    it('Should render a Card View', function () {
        var cardview = React.render(
            <CardView info={person.card_info()} color={person.get('color')} />,
            container
        );
        expected = 'A';
        expect(cardview.getDOMNode().tagName).to.equal(expected);
        
        expected = 'Mr Corey Castillo';
        var name = TestUtils.findRenderedDOMComponentWithTag(cardview, 'h2');
        expect(name.getDOMNode().textContent).to.equal(expected);
    });
});
/* jshint ignore:end */