/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';
require('moment');

var React = require('react'),
    CardView = require('./card');

var Person = React.createClass({
    render: function () {
        var view = this;
        var model = view.props.model;
        var person = model.toJSON();
        var info = model.card_info();
        person.dob = model.dob();

        // list of additional person details
        var more_details = {
            'phone': ['Phone', 'tel:'],
            'email': ['Email', 'email:'],
            'username': ['Username', ''],
            'password': ['Password', ''],
            'dob': ['Date of Birth', '']
        };
        return (
            <div>
                <div className="topcoat-navigation-bar">
                    <div className="topcoat-navigation-bar__item left quarter">
                        <a className="topcoat-icon-button back-button" href="#">Back</a>
                    </div>
                    <div className="topcoat-navigation-bar__item center half">
                        <h1 className="topcoat-navigation-bar__title">Random Person</h1>
                    </div>
                </div>
                <ul className="topcoat-list__container">
                    <li className="topcoat-list__item person-view">
                        <CardView info={info} color={model.color} />
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
                </ul>
            </div>
        );
    }
});

module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        document.title = 'Random Person: ' + view.model.name();
        view.render();
    },
    render: function () {
        var view = this;
        React.render(
            <Person model={view.model}/>,
            view.el
        );
    }
});
/* jshint ignore:end */