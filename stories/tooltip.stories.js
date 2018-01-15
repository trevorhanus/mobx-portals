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
var react_1 = require("@storybook/react");
var addon_actions_1 = require("@storybook/addon-actions");
var Tooltip_1 = require("../src/Tooltip");
var Portal_1 = require("../src/Portal");
require("./style.scss");
react_1.storiesOf('Tooltip', module)
    .add('default (bottom)', function () {
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement(Tooltip_1.Tooltip, { content: "This is a tip." },
            React.createElement("span", null, "Hover Me"))));
})
    .add('positions', function () {
    return (React.createElement("div", null,
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement("div", { className: "sb-center-content" },
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip." },
                React.createElement("span", { style: { marginRight: '2em' } }, "Bottom")),
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip.", position: "right" },
                React.createElement("span", { style: { marginRight: '2em' } }, "Right")),
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip.", position: "top" },
                React.createElement("span", { style: { marginRight: '2em' } }, "Top")),
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip.", position: "left" },
                React.createElement("span", null, "Left")))));
})
    .add('can disable', function () {
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement(Tooltip_1.Tooltip, { content: "This is a tip.", disable: true },
            React.createElement("span", null, "Hover Me, My Tooltip is Disabled"))));
})
    .add('warns when child is stateless', function () {
    var Stateless = function () {
        return React.createElement("div", null, "I'm Stateless.");
    };
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement("div", { className: "story-hint" }, "You should see a warning in the console."),
        React.createElement(Tooltip_1.Tooltip, { content: "This is a tip." },
            React.createElement(Stateless, null))));
})
    .add('hides when target unmounts', function () {
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement("div", { className: "story-hint" },
            "hit 'Return' to show and hide the button",
            React.createElement("br", null),
            "the tooltip should unmount as the button does"),
        React.createElement(HideChildrenOnSpace, null,
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip." },
                React.createElement("button", null, "Hover Me")))));
})
    .add('hides when disabled prop is updated', function () {
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement(DisableOnEnter, null)));
})
    .add('hides when target is clicked', function () {
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement("div", { className: "story-hint" }, "Click the button, the tooltip should hide."),
        React.createElement(HideChildrenOnSpace, null,
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip.", hideOnClick: true },
                React.createElement("button", null, "Hover Me")))));
})
    .add('still calls targets onClick handler', function () {
    return (React.createElement("div", { className: "sb-center-content" },
        React.createElement(Portal_1.Portal, { id: "tooltips" }),
        React.createElement("div", null, "This button logs onClick. Clicking it should hide the toolitp and log an action."),
        React.createElement(HideChildrenOnSpace, null,
            React.createElement(Tooltip_1.Tooltip, { content: "This is a tip.", hideOnClick: true },
                React.createElement("button", { onClick: addon_actions_1.action('clicked') }, "Click Me")))));
});
var HideChildrenOnSpace = (function (_super) {
    __extends(HideChildrenOnSpace, _super);
    function HideChildrenOnSpace(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            show: true,
        };
        return _this;
    }
    HideChildrenOnSpace.prototype.componentWillMount = function () {
        this.handleKeydownCallback = this.handleKeydown.bind(this);
        window.addEventListener('keydown', this.handleKeydownCallback);
    };
    HideChildrenOnSpace.prototype.componentWillUnmount = function () {
        window.removeEventListener('keydown', this.handleKeydownCallback);
    };
    HideChildrenOnSpace.prototype.render = function () {
        return this.state.show
            ? React.createElement("div", null, this.props.children)
            : null;
    };
    HideChildrenOnSpace.prototype.handleKeydown = function (e) {
        if (e.keyCode === 13) {
            this.setState({
                show: !this.state.show,
            });
        }
    };
    return HideChildrenOnSpace;
}(React.Component));
var DisableOnEnter = (function (_super) {
    __extends(DisableOnEnter, _super);
    function DisableOnEnter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            disable: false,
        };
        return _this;
    }
    DisableOnEnter.prototype.componentWillMount = function () {
        this.handleKeydownCallback = this.handleKeydown.bind(this);
        window.addEventListener('keydown', this.handleKeydownCallback);
    };
    DisableOnEnter.prototype.componentWillUnmount = function () {
        window.removeEventListener('keydown', this.handleKeydownCallback);
    };
    DisableOnEnter.prototype.render = function () {
        return (React.createElement(Tooltip_1.Tooltip, { disable: this.state.disable, content: "I'm a tip" },
            React.createElement("button", null, "Hover Me")));
    };
    DisableOnEnter.prototype.handleKeydown = function (e) {
        if (e.keyCode === 13) {
            this.setState({
                disable: !this.state.disable,
            });
        }
    };
    return DisableOnEnter;
}(React.Component));
