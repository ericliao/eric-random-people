var expect = chai.expect,
    sinon = require('sinon'),
    Router = require('../../src/router');

describe('Router', function () {
    var router, route_spy;
    beforeEach(function() {
        // make a mock router with noops for functions
        var mockRouter = Router.extend({
            home: function () {},
            personDetails: function () {}
        });

        // set up a spy and invoke the router
        route_spy = sinon.spy();
        router = new mockRouter();

        // prevent history.start from throwing error
        try {
            Backbone.history.start({silent: true, pushState: true});
        } catch(e) {
        }
        // navigate to test url
        router.navigate('test/index.html?grep=Router');
    });

    afterEach(function(){
        // reset url
        router.navigate('test/index.html?grep=Router');
    });

    it('expect 2 routes', function() {
        expect(_.size(router.routes)).to.equal(2);
    });

    it('/ - route exists and points to the right method', function () {
        expect(router.routes['']).to.equal('home');
    });

    it('fires the home route with a blank hash', function () {
        router.bind('route:home', route_spy);
        router.navigate('', true);
        expect(route_spy.calledOnce).to.be.true;
        expect(route_spy.calledWith()).to.be.ok;
    });

    it('fires the personDetails route with a #person/id hash', function () {
        router.bind('route:personDetails', route_spy);
        router.navigate('#person/eric', true);
        expect(route_spy.calledOnce).to.be.true;
        expect(route_spy.calledWith('eric')).to.be.true;
    });
});