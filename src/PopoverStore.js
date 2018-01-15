"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var utils_1 = require("./utils");
var uuid_1 = require("uuid");
var PopoverStore = (function () {
    function PopoverStore() {
        this._openPopovers = mobx_1.observable.map();
    }
    Object.defineProperty(PopoverStore.prototype, "renderedPopovers", {
        get: function () {
            return this._openPopovers.values();
        },
        enumerable: true,
        configurable: true
    });
    PopoverStore.prototype.isOpen = function (id) {
        return this._openPopovers.has(id);
    };
    PopoverStore.prototype.hide = function (id, data) {
        var popover = this._openPopovers.get(id);
        popover.hide(data);
    };
    PopoverStore.prototype.show = function (options) {
        var _this = this;
        var id = options.id != null ? options.id : uuid_1.v4();
        var portal = options.portal != null ? options.portal : 'default';
        if (this._openPopovers.has(id)) {
            utils_1.warn("popover with id " + id + " is already opened, replacing the current popover.");
        }
        return new Promise(function (resolve, reject) {
            var popover = {
                id: id,
                portal: portal,
                externalId: options.externalId,
                component: options.component,
                hide: function (data) {
                    _this._openPopovers.delete(id);
                    resolve(data);
                },
            };
            _this._openPopovers.set(id, popover);
        });
    };
    PopoverStore.prototype.toggle = function (popover) {
        var id = popover.id;
        if (this._openPopovers.has(id)) {
            this._openPopovers.delete(id);
        }
        else {
            this._openPopovers.set(id, popover);
        }
    };
    __decorate([
        mobx_1.observable
    ], PopoverStore.prototype, "_openPopovers", void 0);
    __decorate([
        mobx_1.computed
    ], PopoverStore.prototype, "renderedPopovers", null);
    __decorate([
        mobx_1.action
    ], PopoverStore.prototype, "hide", null);
    __decorate([
        mobx_1.action
    ], PopoverStore.prototype, "show", null);
    __decorate([
        mobx_1.action
    ], PopoverStore.prototype, "toggle", null);
    return PopoverStore;
}());
exports.PopoverStore = PopoverStore;
var popovers = new PopoverStore();
exports.popovers = popovers;
