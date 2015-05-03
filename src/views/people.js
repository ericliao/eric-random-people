/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';

var React = require('react'),
    CardView = require('./card');

module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        view.render();
        view.collection.on('add', view.render, view);
    },
    render: function () {
        var view = this;
        React.render(
            <div>
                <div className="topcoat-navigation-bar">
                    <div className="topcoat-navigation-bar__item center full">
                        <h1 className="topcoat-navigation-bar__title">Random People</h1>
                    </div>
                </div>
                <ul className="topcoat-list__container">
                    {view.collection.map(function (model) {
                        var info = model.card_info();
                        return <li className="topcoat-list__item details-item person-card" key={model.seed} >
                                <CardView info={info} seed={model.seed}/>
                               </li>
                    })}
                </ul>
            </div>,
            view.el
        );
    }
});
/* jshint ignore:end */