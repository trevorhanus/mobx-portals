"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@storybook/react");
var React = require("react");
var PopoverStore_1 = require("../src/PopoverStore");
var Portal_1 = require("../src/Portal");
require("./style.scss");
var EXTERNAL_PORTAL_ID = 'external-portal';
var node = document.getElementById(EXTERNAL_PORTAL_ID);
if (node == null) {
    var div = document.createElement('div');
    div.setAttribute('id', EXTERNAL_PORTAL_ID);
    document.body.appendChild(div);
}
react_1.storiesOf('Portal', module)
    .add('Named Portal', function () {
    var showModal = function () {
        PopoverStore_1.popovers.show({
            id: 'myModal',
            portal: 'my-portal',
            component: React.createElement("div", null, "Hi, I'm the modal!")
        });
    };
    var hideModal = function () {
        PopoverStore_1.popovers.hide('myModal');
    };
    return (React.createElement("div", null,
        React.createElement("button", { onClick: showModal }, "Show Modal"),
        React.createElement("button", { onClick: hideModal }, "Hide Modal"),
        React.createElement(Portal_1.Portal, { id: "my-portal" })));
})
    .add('Default Portal', function () {
    var showModal = function () {
        PopoverStore_1.popovers.show({
            id: 'myModal',
            component: React.createElement("div", null, "Hi, I'm the modal!")
        });
    };
    var hideModal = function () {
        PopoverStore_1.popovers.hide('myModal');
    };
    return (React.createElement("div", null,
        React.createElement("button", { onClick: showModal }, "Show Modal"),
        React.createElement("button", { onClick: hideModal }, "Hide Modal"),
        React.createElement(Portal_1.Portal, null)));
})
    .add('Hide from ported component', function () {
    var Modal = function (props) {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: props.hide }, "Hide"),
            "With this one, you can hide it by clicking the button."));
    };
    var showModal = function () {
        PopoverStore_1.popovers.show({
            id: 'myModal',
            component: React.createElement(Modal, null)
        });
    };
    return (React.createElement("div", null,
        React.createElement("button", { onClick: showModal }, "Show Modal"),
        React.createElement(Portal_1.Portal, null)));
})
    .add('to external node', function () {
    var Modal = function (props) {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: props.hide }, "Hide"),
            "With this one, you can hide it by clicking the button."));
    };
    var showModal = function () {
        PopoverStore_1.popovers.show({
            id: 'myModal',
            externalId: EXTERNAL_PORTAL_ID,
            component: React.createElement(Modal, null)
        });
    };
    return (React.createElement("div", null,
        React.createElement(Portal_1.Portal, { toExternalId: EXTERNAL_PORTAL_ID }),
        React.createElement("button", { onClick: showModal }, "Show Modal (external)")));
});
