"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { Button } from 'antd';
// const ButtonGroup = Button.Group;
var _default = function _default(_ref) {
  var children = _ref.children,
      settings = _ref.config.settings;
  var renderSize = settings.renderSize;
  return /*#__PURE__*/_react["default"].createElement(_ButtonGroup["default"], {
    size: renderSize // disableElevation 
    ,
    color: "primary",
    variant: "outlined"
  }, children);
};

exports["default"] = _default;