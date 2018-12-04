import * as React from 'react';

export function warn(message: string) {
    console.warn(`[mobx-portals] Warning: ${message}`);
}

export type MessageFunc = () => string;
export function invariant(check: boolean, message: (string | MessageFunc)) {
    if (check) {
        const msg = typeof message === 'string' ? message : message();
        throw new Error(`[maven-web] Invariant: ${msg}`);
    }
}

export type orCallback = () => any;
export function isOr<T>(isVal: T | undefined, orVal: T | orCallback): T {
    if (isVal != null) {
        return isVal;
    } else {
        return typeof orVal === 'function' ? orVal() : orVal;
    }
}

/**
 * This will clone a ClassComponent and a StatelessComponent and
 * just return a dom element and a string
 *
 */

export function cloneElementWithProps(el: React.ReactNode, props: any): any {
    if (el == null || el === false) {
        return null;
    }

    // just a string
    if (typeof el === 'string') {
        return el;
    }

    if (React.isValidElement(el)) {
        const newProps = {
            ...el.props,
            ...props,
        };

        return React.cloneElement(el, newProps);
    }

    throw new Error('unknown element type.');
}

export function isDomElement(el: any): boolean {
    return el.type != null && typeof el.type === 'string';
}
