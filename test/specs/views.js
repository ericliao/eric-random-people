/* @jsx React.DOM */
/* jshint ignore:start */
var expect = chai.expect;

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Color = require('randomcolor'),
    Person = require('../../src/models/person'),
    People = require('../../src/collections/people'),
    CardView = require('../../src/views/card'),
    PersonView = require('../../src/views/person'),
    PeopleView = require('../../src/views/people');

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
        it('expect correct type of node to be rendered', function () {
            expect(cardview.getDOMNode().tagName).to.equal(expected);
        });

        expected = 'Mr Corey Castillo';
        it('expect correct name to be rendered', function () {
            var name = TestUtils.findRenderedDOMComponentWithTag(cardview, 'h2');
            expect(name.getDOMNode().textContent).to.equal(expected);
        });
    });
});

describe('View: Person', function () {
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
    it('Should render a Person View', function () {
        var view = new PersonView({
            el: container,
            model: person
        });

        expected = 5;
        it('expect 5 items in more details', function () {
            expect(view.$el.find('.details-item').length).to.equal(expected);
        });

        expected = [
            '(898)-488-6905', 'corey.castillo94@example.com',
            'purplemouse654', 'nymets', '7 Jul 1981 (33 years old)'
        ];
        it('expect the items to be filled in correctly', function () {
            var details = view.$el.find('.details-item').map(function (key, item) {
                return $(item).find('p:last').text();
            }).get();
            expect(details).to.deep.equal(expected);
        });
    });
});

describe('View: People', function () {
    var people, container, color_mapping, expected;
    before(function (done) {
        people = new People();
        color_mapping = people.generate(3, function (mapping) {
            color_mapping = mapping;
            done();
        });
    });

    container = document.createElement('div');
    it('Should render a People View', function () {
        var view = new PeopleView({
            el: container,
            collection: people
        });

        expected = 'Random People';
        it('expect h1 with correct title', function () {
            var header = TestUtils.findRenderedDOMComponentWithTag(cardview, 'h1');
            expect(header.getDOMNode().textContent).to.equal(expected);
        });

        expected = 3;
        it('expect to render 3 person cards', function () {
            var cards = TestUtils.findRenderedDOMComponentsWithTag(view, 'li');
            expect(cards.length).to.equal(expected);
        });
    });
});
/* jshint ignore:end */