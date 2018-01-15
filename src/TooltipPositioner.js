"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("./utils");
var utils_2 = require("./utils");
var TooltipPositioner = (function (_super) {
    __extends(TooltipPositioner, _super);
    function TooltipPositioner(props) {
        var _this = _super.call(this, props) || this;
        _this.scrollCallback = null;
        _this.state = {
            targetBBox: _this.getTargetClientBbox(),
        };
        return _this;
    }
    TooltipPositioner.prototype.render = function () {
        var targetBBox = this.state.targetBBox;
        var position = utils_2.isOr(this.props.position, 'bottom');
        var positionerStyle = getPositionStyle(targetBBox, position);
        var tipStyle = getTipStyle(position);
        return (React.createElement("div", { className: "popover-positioner-wrapper", style: positionerStyle }, React.cloneElement(React.Children.only(this.props.children), { style: tipStyle })));
    };
    TooltipPositioner.prototype.getTargetClientBbox = function () {
        var target = this.props.target;
        utils_1.invariant(target == null, 'cannot position tooltip becuase target is null');
        return target.getBoundingClientRect();
    };
    return TooltipPositioner;
}(React.Component));
exports.TooltipPositioner = TooltipPositioner;
function getPositionStyle(targetBBox, position) {
    var pos = utils_2.isOr(position, 'bottom');
    var width = targetBBox.width, height = targetBBox.height, top = targetBBox.top, left = targetBBox.left;
    var style = {
        position: 'fixed',
    };
    switch (pos) {
        case 'top':
            style.top = top - 10;
            style.left = (left + width / 2);
            style.transform = "translateY(-100%)";
            return style;
        case 'right':
            style.left = left + width + 10;
            style.top = (top + height / 2);
            return style;
        case 'bottom':
            style.top = (top + height) + 10;
            style.left = (left + width / 2);
            return style;
        case 'left':
            style.top = (top + height / 2);
            style.left = left - 10;
            style.transform = "translateX(-100%)";
            return style;
        default:
            utils_1.invariant(true, "unrecognized tooltip position '" + pos + "'");
    }
}
exports.getPositionStyle = getPositionStyle;
function getTipStyle(position) {
    switch (position) {
        case 'top':
        case 'bottom':
            return {
                transform: "translateX(-50%)",
            };
        case 'left':
        case 'right':
            return {
                transform: "translateY(-50%)",
            };
        default:
            return {};
    }
}
exports.getTipStyle = getTipStyle;
