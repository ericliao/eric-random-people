/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';

var React = require('react');

var Picture = React.createClass({
    render: function () {
        var view = this;
        //return (
        //);
    }
});

module.exports = React.createClass({
    render: function () {
        var view = this;
        var name = view.props.info.name;
        var href = '#person/' + view.props.seed;
        return (
            <a className="person-panel" href={href}>
                <h2>{name.title} {name.first} {name.last}</h2>
            </a>
        );
    }
});
/* jshint ignore:end */