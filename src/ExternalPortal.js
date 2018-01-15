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
var ReactDOM = require("react-dom");
var PopoverStore_1 = require("./PopoverStore");
var utils_1 = require("./utils");
exports.ExternalPortal = mobx_react_1.observer(function (props) {
    var thisPortalId = props.externalId;
    var portal = getPortalElement(thisPortalId);
    return ReactDOM.createPortal(PopoverStore_1.popovers.renderedPopovers.map(function (popover) {
        var id = popover.id, component = popover.component, hide = popover.hide, externalId = popover.externalId;
        if (externalId == null || externalId !== thisPortalId)
            return null;
        var props = {
            key: id,
            hide: hide,
        };
        if (typeof component === 'string') {
            return React.cloneElement(component);
        }
        else if (component.prototype && component.prototype.render == null) {
            var StatelessComp = component;
            return React.createElement(StatelessComp, __assign({}, props));
        }
        else {
            var c = component;
            return React.cloneElement(c, props);
        }
    }), portal);
});
var portalDiv;
function getPortalElement(id) {
    if (portalDiv == null) {
        var el = document.getElementById(id);
        utils_1.invariant(el == null, "could not find node with id '" + id + "'");
        portalDiv = el;
    }
    return portalDiv;
}
