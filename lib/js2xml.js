var builder = require("xmlbuilder");

exports.Js2Xml = (function() {

  function Js2Xml(root_element_name, struct, xml_version, encoding) {
    var root;
    if (xml_version === null) xml_version = "1.0";
    if (encoding === null) encoding = "UTF-8";
    this.xml = builder.create(root_element_name,
      { "version": xml_version, "encoding": encoding });
    this.convert(struct, this.xml, root_element_name);
  }

  Js2Xml.prototype.pluralisation = function(name) {
    return "item";
  };

  Js2Xml.prototype.convert = function(structure, doc, name) {
    var item, value, _i, _len, _ref;
    if ((_ref = typeof structure) === "string" || _ref === "number") {
      doc.txt(structure);
    } else if (typeof structure === "object" && Array.isArray(structure)) {
      for (_i = 0, _len = structure.length; _i < _len; _i++) {
        item = structure[_i];
        this.convert(item, doc.ele(this.pluralisation(name)), name);
      }
    } else if (typeof structure === "object") {
      for (name in structure) {
        value = structure[name];
        this.convert(value, doc.ele(name), name);
      }
    }
    return this;
  };

  Js2Xml.prototype.toString = function() {
    return this.xml.end();
  };

  return Js2Xml;

})();
