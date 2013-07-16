var expect = require("chai").expect;
var nock = require('nock');
var Recurly = require('../');
var recurly = new Recurly({
  API_VERSION: 2
});

var FIXTURES = {
  LIST: __dirname + '/fixtures/subscription.list.xml',
  UPDATE: __dirname + '/fixtures/subscription.update.xml'
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
          "$": {
            "type": "array"
          },
          subscription: {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96"
            },
            account: {
              "$": {
                "href": "https://your-subdomain.recurly.com/v2/accounts/1"
              }
            },
            plan: {
              "$": {
                "href": "https://your-subdomain.recurly.com/v2/plans/gold"
              },
              plan_code: 'gold',
              name: 'Gold plan'
            },
            uuid: '44f83d7cba354d5b84812419f923ea96',
            state: 'active',
            unit_amount_in_cents: {
              "_": "800",
              "$": {
                "type": "integer"
              }
            },
            currency: 'EUR',
            quantity: {
              "_": "1",
              "$": {
                "type": "integer"
              }
            },
            activated_at: {
              "_": "2011-05-27T07:00:00Z",
              "$": {
                "type": "datetime"
              }
            },
            canceled_at: {
              "$": {
                "nil":"nil"
              }
            },
            expires_at: {
              "$": {
                "nil":"nil"
              }
            },
            current_period_started_at: {
              "_": '2011-06-27T07:00:00Z',
              "$": {
                "type": "datetime"
              }
            },
            current_period_ends_at: {
              "_": '2010-07-27T07:00:00Z',
              "$": {
                "type": "datetime"
              }
            },
            trial_started_at: {
              "$": {
                "nil":"nil"
              }
            },
            trial_ends_at: {
              "$": {
                "nil":"nil"
              }
            },
            subscription_add_ons: {
              "$": {
                "type":"array"
              }
            },
            a: [
              {
                "$": {
                  "name": "cancel",
                  "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96/cancel",
                  "method": "put"
                }
              },
              {
                "$": {
                  "name": "terminate",
                  "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96/terminate",
                  "method": "put"
                }
              },
              {
                "$": {
                  "name": "postpone",
                  "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96/postpone",
                  "method": "put"
                }
              }]
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

describe("update", function() {

    beforeEach(function() {
      nock('https://api.recurly.com')
        .put('/v2/subscriptions/44f83d7cba354d5b84812419f923ea96')
        .replyWithFile(200, FIXTURES.UPDATE);
    });

    it("should list subscriptions", function(done) {
      var expected = {
        subscription: {
          "$": {
            "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96"
          },
          account: {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1"
            }
          },
          plan: {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/plans/gold"
            },
            plan_code: 'gold',
            name: 'Gold plan'
          },
          uuid: '44f83d7cba354d5b84812419f923ea96',
          state: 'active',
          unit_amount_in_cents: {
            "_":'800',
            "$": {
              "type": "integer"
            }
          },
          currency: 'EUR',
          quantity: {
            "_":'1',
            "$": {
              "type": "integer"
            }
          },
          activated_at: {
            "_": '2011-05-27T07:00:00Z',
            "$": {
              "type": "datetime"
            }
          },
          canceled_at: {
            "$": {
              "nil":"nil"
            }
          },
          expires_at: {
            "$": {
              "nil":"nil"
            }
          },
          current_period_started_at: {
            "_": '2011-06-27T07:00:00Z',
            "$": {
              "type": "datetime"
            }
          },
          current_period_ends_at: {
            "_": '2010-07-27T07:00:00Z',
            "$": {
              "type": "datetime"
            }
          },
          trial_started_at: {
            "$": {
              "nil":"nil"
            }
          },
          trial_ends_at: {
            "$": {
              "nil":"nil"
            }
          },
          subscription_add_ons: {
            "$": {
                "type":"array"
            },
            subscription_add_on: {
              add_on_code: 'ipaddresses',
              quantity: '10',
              unit_amount_in_cents: '150'
            }
          },
          a: [
            {
              "$": {
                "name": "cancel",
                "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96/cancel",
                "method": "put"
              }
            },
            {
              "$": {
                "name": "terminate",
                "href": "https://your-subdomain.recurly.com/v2/subscriptions/44f83d7cba354d5b84812419f923ea96/terminate",
                "method": "put"
              }
            }
          ]
        }
      };

      var update = {
        subscription: {
          timeframe: "now",
          quantity: "2",
          subscription_add_ons: {
            subscription_add_on: {
              add_on_code: "ipaddresses",
              quantity: 10,
              unit_amount_in_cents: 150
            }
          }
        }
      };

      recurly.subscriptions.update('44f83d7cba354d5b84812419f923ea96', update, function(subscription) {
        expect(subscription.status).to.eql("ok");
        expect(subscription.data).to.deep.equal(expected);
        done();
      });

    });

  });

});
