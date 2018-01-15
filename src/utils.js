"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warn(message) {
    console.warn('[mobx-popovers] Warning: ' + message);
}
exports.warn = warn;
function invariant(check, message) {
    if (check) {
        var msg = typeof message === 'string' ? message : message();
        throw new Error("[maven-web] Invariant: " + msg);
    }
}
exports.invariant = invariant;
function isOr(isVal, orVal) {
    if (isVal != null) {
        return isVal;
    }
    else {
        return typeof orVal === 'function' ? orVal() : orVal;
    }
}
exports.isOr = isOr;
