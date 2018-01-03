export function warn(message: string) {
    console.warn('[mobx-popovers] Warning: ' + message);
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
