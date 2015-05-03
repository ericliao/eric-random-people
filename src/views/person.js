/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';
require('moment');

var React = require('react');

var Picture = React.createClass({
    componentWillUnmount: function () {
        $(this.getDOMNode()).remove();
    },
    render: function () {
        var view = this;
        //return (
        //);
    }
});

var Panel = React.createClass({
    componentWillUnmount: function () {
        $(this.getDOMNode()).remove();
    },
    render: function () {
        var view = this;
        var name = view.props.details.name;
        return (
            <div className="person-panel">
                <h1>{name.title} {name.first} {name.last}</h1>
            </div>
        );
    }
});

var Person = React.createClass({
    componentWillUnmount: function () {
        $(this.getDOMNode()).remove();
    },
    render: function () {
        var view = this;
        var person = view.props.person;
        var details = {
            'name': person.name,
            'location': person.location,
            'picture': person.picture
        };

        // convert date of birth to human readable
        person.dob = moment.unix(person.dob).format('D MMM YYYY');

        // list of additional person details
        var more_details = {
            'dob': ['Date of Birth', ''],
            'phone': ['Phone', 'tel:'],
            'email': ['Email', 'email:'],
            'username': ['Username', ''],
            'password': ['Password', '']
        };
        return (
            <li className="topcoat-list__item person-view">
                <Panel details={details} />
                <ul className="topcoat-list__container">
                    {_.map(more_details, function (detail, key) {
                        var href = detail[1] !== '' ? detail[1] + person[key] : (void 0);
                        return <li className="topcoat-list__item details-item" key={key}>
                                <a href={href}>
                                    <p>{detail[0]}:</p>
                                    <p>{person[key]}</p>
                                </a>
                            </li>
                    })}
                </ul>
            </li>
        );
    }
});

module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        view.render();
    },
    render: function () {
        var view = this;
        var person = this.model.toJSON()[0];
        React.render(
            <Person person={person}/>,
            this.el
        );
    }
});
/* jshint ignore:end */