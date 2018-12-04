import { action, computed, observable, ObservableMap } from 'mobx';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { warn } from './utils';

export interface IPopoverProps {
    children?: React.ReactNode;
    hide?: (data?: any) => void; // popover must call this to be closed
}

export interface IRenderOptions {
    id?: string;
    portalKey?: string;
    component: JSX.Element | React.StatelessComponent | React.ComponentClass;
}

export interface IRenderResponse {
    unmount: (data: any) => void;
    waitForUnmount: Promise<any>;
}

export interface IPortedComponent {
    id: string;
    portalKey: string;
    component: JSX.Element | React.StatelessComponent | React.ComponentClass;
    unmount: (data?: any) => void;
}

export class Portals {
    @observable private _portedComponents: ObservableMap<IPortedComponent>;

    constructor() {
        this._portedComponents = observable.map<IPortedComponent>();
    }

    @computed
    get portedComponents(): IPortedComponent[] {
        return this._portedComponents.values();
    }

    isOpen(id: string): boolean {
        return this._portedComponents.has(id);
    }

    @action
    render(opts: IRenderOptions): IRenderResponse {
        const id = opts.id != null ? opts.id : uuidv4();
        const portalKey = opts.portalKey != null ? opts.portalKey : 'default';

        if (this._portedComponents.has(id)) {
            warn(`popover with id ${id} is already opened, replacing the current popover.`);
        }

        let unmountCb;

        const unmountPromise = new Promise(resolve => {
            unmountCb = (data: any) => {
                this._portedComponents.delete(id);
                resolve(data);
            };

            const portedComponent = {
                id,
                portalKey,
                component: opts.component,
                unmount: (data: any) => {
                    this._portedComponents.delete(id);
                    resolve(data);
                },
            };

            this._portedComponents.set(id, portedComponent);
        });

        return {
            unmount: unmountCb,
            waitForUnmount: unmountPromise,
        };
    }

    @action
    unmount(id: string, data?: any) {
        if (this.isOpen(id)) {
            const ported = this._portedComponents.get(id);
            ported.unmount(data);
        }
    }

    @action
    toggle(popover: IPortedComponent): void {
        const { id } = popover;

        if (this._portedComponents.has(id)) {
            this._portedComponents.delete(id);
        } else {
            this._portedComponents.set(id, popover);
        }
    }
}

const portals = new Portals();

export {
    portals,
};
