/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';

var React = require('react');

var Picture = React.createClass({
    render: function () {
        var view = this;
        var style = {
            'border': '2px solid ' + view.props.color
        };
        return (
            <img style={style} className="thumbnail" src={view.props.thumbnail}></img>
        );
    }
});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = React.createClass({
    render: function () {
        var view = this;
        var href = view.props.seed ? '#person/' + view.props.seed : (void 0);
        var picture = view.props.info.picture;
        return (
            <a className="person-card" href={href}>
                <Picture thumbnail={picture.thumbnail} color={view.props.color} />
                <h2 className="name">{view.props.info.name}</h2>
                <p>Address:</p>
                <p>{view.props.info.location}</p>
            </a>
        );
    }
});
/* jshint ignore:end */