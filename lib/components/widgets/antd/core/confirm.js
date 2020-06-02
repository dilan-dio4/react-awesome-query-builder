"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _antd = require("antd");

var confirm = _antd.Modal.confirm;

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    onOk: onOk,
    okText: okText,
    cancelText: cancelText,
    title: title
  };
  confirm(options);
};

exports["default"] = _default;