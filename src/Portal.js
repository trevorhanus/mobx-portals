"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_react_1 = require("mobx-react");
var React = require("react");
var PopoverStore_1 = require("./PopoverStore");
var ExternalPortal_1 = require("./ExternalPortal");
exports.Portal = mobx_react_1.observer(function (props) {
    if (props.toExternalId != null) {
        return React.createElement(ExternalPortal_1.ExternalPortal, { externalId: props.toExternalId });
    }
    var portalId = props.id != null ? props.id : 'default';
    return (React.createElement("div", { id: portalId }, PopoverStore_1.popovers.renderedPopovers.map(function (popover) {
        var id = popover.id, portal = popover.portal, component = popover.component, hide = popover.hide;
        if (portal !== portalId)
            return null;
        var props = {
            key: id,
            hide: hide,
        };
        if (isDOMTypeElement(component)) {
            return React.cloneElement(component, { key: id });
        }
        else if (component.prototype && component.prototype.render == null) {
            var StatelessComp = component;
            return React.createElement(StatelessComp, __assign({}, props));
        }
        else {
            var c = component;
            return React.cloneElement(c, props);
        }
    })));
});
function isElement(element) {
    return React.isValidElement(element);
}
function isDOMTypeElement(element) {
    return isElement(element) && typeof element.type === 'string';
}
