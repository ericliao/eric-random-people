/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';
var React = require('react');

var Panel = React.createClass({
    componentWillUnmount: function () {
        $(this.getDOMNode()).remove();
    },
    render: function () {
        var view = this;
        return (
            <li className="topcoat-list__item panel">
                <h3>Email: {view.props.person.email}</h3>
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
            <Panel person={person}/>,
            this.el
        );
    }
});
/* jshint ignore:end */