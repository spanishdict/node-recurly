var Js2Xml = require("../lib/js2xml").Js2Xml;
var assert = require("assert");

describe("Js2Xml", function() {
  describe("create subscription", function() {
    var details = {
      plan_code: "gold",
      currency: "EUR",
      account: {
        account_code: 1,
        email: "verena@example.com",
        first_name: "Verena",
        last_name: "Example",
        billing_info: {
          number: "4111-1111-1111-1111",
          month: 1,
          year: 2014
        }
      }
    };

    var subscription = new Js2Xml('subscription', details).toString();

    it("should create expected object", function() {
      var expected = [
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
        "<subscription>",
          "<plan_code>gold</plan_code>",
          "<currency>EUR</currency>",
          "<account>",
            "<account_code>1</account_code>",
            "<email>verena@example.com</email>",
            "<first_name>Verena</first_name>",
            "<last_name>Example</last_name>",
            "<billing_info>",
              "<number>4111-1111-1111-1111</number>",
              "<month>1</month>",
              "<year>2014</year>",
            "</billing_info>",
          "</account>",
        "</subscription>"].join("");

      assert.equal(subscription, expected);

    });
  });
});
