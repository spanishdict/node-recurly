var expect = require("chai").expect;
var nock = require('nock');
var Recurly = require('../');
var recurly = new Recurly({
  API_VERSION: 2
});

var FIXTURES = {
  LIST: __dirname + '/fixtures/account.list.xml',
  UPDATE: __dirname + '/fixtures/account.update.xml'
};

describe("Accounts", function() {

  describe("list", function() {

    beforeEach(function() {
      nock('https://api.recurly.com')
        .get('/v2/accounts')
        .replyWithFile(200, FIXTURES.LIST);
    });

    it("should list accounts", function(done) {
      var expected = {
        "accounts": {
          "$": {
           "type": "array"
          },
          "account": {
           "$": {
             "href": "https://your-subdomain.recurly.com/v2/accounts/1"
           },
           "adjustments": {
             "$": {
               "href": "https://your-subdomain.recurly.com/v2/accounts/1/adjustments"
             }
           },
           "billing_info": {
             "$": {
               "href": "https://your-subdomain.recurly.com/v2/accounts/1/billing_info"
             }
           },
           "invoices": {
             "$": {
               "href": "https://your-subdomain.recurly.com/v2/accounts/1/invoices"
             }
           },
           "redemption": {
             "$": {
               "href": "https://your-subdomain.recurly.com/v2/accounts/1/redemption"
             }
           },
           "subscriptions": {
             "$": {
               "href": "https://your-subdomain.recurly.com/v2/accounts/1/subscriptions"
             }
           },
           "transactions": {
             "$": {
               "href": "https://your-subdomain.recurly.com/v2/accounts/1/transactions"
             }
           },
           "account_code": "1",
           "state": "active",
           "username": {
             "$": {
               "nil": "nil"
             }
           },
           "email": "verena@example.com",
           "first_name": "Verena",
           "last_name": "Example",
           "accept_language": {
             "$": {
               "nil": "nil"
             }
           },
           "hosted_login_token": "a92468579e9c4231a6c0031c4716c01d",
           "created_at": {
             "_": "2011-10-25T12:00:00",
             "$": {
               "type": "datetime"
             }
           },
           "address": {
             "address1": "123 Main St.",
             "address2": {
               "$": {
                 "nil": "nil"
               }
             },
             "city": "San Francisco",
             "state": "CA",
             "zip": "94105",
             "country": "US",
             "phone": {
               "$": {
                 "nil": "nil"
               }
             }
           }
          }
        }
      };

      recurly.accounts.list(function(accounts) {
        expect(accounts.status).to.eql("ok");
        expect(accounts.data).to.deep.equal(expected);
        done();
      });
    });

  });

  describe("update", function() {

    beforeEach(function() {
      nock('https://api.recurly.com')
        .put('/v2/accounts/1')
        .replyWithFile(200, FIXTURES.UPDATE);
    });

    it("should list account", function(done) {
      var expected = {
        "account": {
          "$": {
            "href": "https://your-subdomain.recurly.com/v2/accounts/1"
          },
          "adjustments": {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1/adjustments"
            }
          },
          "billing_info": {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1/billing_info"
            }
          },
          "invoices": {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1/invoices"
            }
          },
          "redemption": {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1/redemption"
            }
          },
          "subscriptions": {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1/subscriptions"
            }
          },
          "transactions": {
            "$": {
              "href": "https://your-subdomain.recurly.com/v2/accounts/1/transactions"
            }
          },
          "account_code": "1",
          "state": "active",
          "username": {
            "$": {
              "nil": "nil"
            }
          },
          "email": "verena@example.com",
          "first_name": "Verena2",
          "last_name": "Example2",
          "accept_language": {
            "$": {
              "nil": "nil"
            }
          },
          "hosted_login_token": "a92468579e9c4231a6c0031c4716c01d",
          "created_at": {
            "_": "2011-10-25T12:00:00",
            "$": {
              "type": "datetime"
            }
          },
          "address": {
            "address1": "123 Main St.",
            "address2": {
              "$": {
                "nil": "nil"
              }
            },
            "city": "San Francisco",
            "state": "CA",
            "zip": "94105",
            "country": "US",
            "phone": {
              "$": {
                "nil": "nil"
              }
            }
          }
        }
      };

      var update = {
        account: {
          first_name: "Verena2",
          last_name: "Example2"
        }
      };

      recurly.accounts.update('1', update, function(account) {
        expect(account.status).to.eql("ok");
        expect(account.data).to.deep.equal(expected);
        done();
      });
    });
  });
});

