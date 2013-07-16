var expect = require("chai").expect;
var nock = require('nock');
var Recurly = require('../');
var recurly = new Recurly({
  API_VERSION: 2
});

var FIXTURES = {
  LIST: __dirname + '/fixtures/subscription.list.xml'
};

describe("Subscriptions", function() {

  describe("list", function() {

    beforeEach(function() {
      nock('https://api.recurly.com')
        .get('/v2/subscriptions')
        .replyWithFile(200, FIXTURES.LIST);
    });

    it("should list subscriptions", function(done) {
      var expected = {
        subscriptions: {
          subscription: {
            account: '',
            plan: {
              plan_code: 'gold',
              name: 'Gold plan'
            },
            uuid: '44f83d7cba354d5b84812419f923ea96',
            state: 'active',
            unit_amount_in_cents: '800',
            currency: 'EUR',
            quantity: '1',
            activated_at: '2011-05-27T07:00:00Z',
            canceled_at: '',
            expires_at: '',
            current_period_started_at: '2011-06-27T07:00:00Z',
            current_period_ends_at: '2010-07-27T07:00:00Z',
            trial_started_at: '',
            trial_ends_at: '',
            subscription_add_ons: '\n    ',
            a: [ '', '', '' ]
          }
        }
      };

      recurly.subscriptions.list(function(subscriptions) {
        expect(subscriptions.status).to.eql("ok");
        expect(subscriptions.data).to.deep.equal(expected);
        done();
      });

    });

  });

});
