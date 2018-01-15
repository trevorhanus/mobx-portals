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
var PopoverStore_1 = require("./PopoverStore");
var utils_1 = require("./utils");
var TooltipPositioner_1 = require("./TooltipPositioner");
var classNames = require("classnames");
var utils_2 = require("./utils");
var uuid_1 = require("uuid");
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(props) {
        var _this = _super.call(this, props) || this;
        _this.childRef = null;
        _this.tooltipId = uuid_1.v4();
        return _this;
    }
    Tooltip.prototype.componentWillUnmount = function () {
        this.closeTooltip();
    };
    Tooltip.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.disable) {
            this.closeTooltip();
        }
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        var children = this.props.children;
        if (!React.isValidElement(children)) {
            utils_1.warn("tooltips only work with valid elements");
        }
        if (typeof this.props.children.type === 'function') {
            utils_1.warn("tooltips only work with valid elements");
        }
        var childProps = {
            ref: function (node) { return _this.childRef = node; },
            onMouseEnter: this.handleMouseEnter.bind(this),
            onClick: this.handleClick.bind(this),
        };
        return (React.cloneElement(React.Children.only(children), childProps));
    };
    Tooltip.prototype.showTooltip = function () {
        if (this.props.disable === true)
            return;
        var content = this.props.content;
        var portalId = utils_2.isOr(this.props.portal, 'tooltips');
        var position = utils_2.isOr(this.props.position, 'bottom');
        var id = this.tooltipId;
        var tipClassName = classNames('mp-tooltip', tipArrowClassName(position));
        var tip = React.createElement("div", { className: tipClassName }, content);
        PopoverStore_1.popovers.show({
            id: id,
            portal: portalId,
            component: (React.createElement(TooltipPositioner_1.TooltipPositioner, { target: this.childRef, position: position }, tip)),
        });
    };
    Tooltip.prototype.closeTooltip = function () {
        if (PopoverStore_1.popovers.isOpen(this.tooltipId)) {
            PopoverStore_1.popovers.hide(this.tooltipId);
        }
    };
    Tooltip.prototype.handleClick = function (e) {
        var hideOnClick = utils_2.isOr(this.props.hideOnClick, true);
        if (hideOnClick) {
            this.closeTooltip();
        }
        var child = React.Children.only(this.props.children);
        var onClick = child.props.onClick;
        if (onClick != null) {
            onClick(e);
        }
    };
    Tooltip.prototype.handleMouseEnter = function (e) {
        if (this.props.disable === true)
            return;
        var target = e.currentTarget;
        this.mouseleaveCallback = this.handleMouseLeave.bind(this);
        target.addEventListener('mouseleave', this.mouseleaveCallback);
        this.showTooltip();
    };
    Tooltip.prototype.handleMouseLeave = function (e) {
        e.target.removeEventListener('mouseleave', this.mouseleaveCallback);
        this.mouseleaveCallback = null;
        this.closeTooltip();
    };
    return Tooltip;
}(React.Component));
exports.Tooltip = Tooltip;
function tipArrowClassName(tipPosition) {
    switch (tipPosition) {
        case 'top':
            return 'arrow-bottom-center';
        case 'right':
            return 'arrow-left-center';
        case 'bottom':
            return 'arrow-top-center';
        case 'left':
            return 'arrow-right-center';
        default:
            return '';
    }
}
