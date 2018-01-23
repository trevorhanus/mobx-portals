import * as React from 'react';
import { action, computed, observable, ObservableMap, runInAction } from 'mobx';
import { warn } from './utils';
import { v4 as uuidv4 } from 'uuid';

export interface IPopoverProps {
    children?: React.ReactNode;
    hide?: (data?: any) => void; // popover must call this to be closed
}

export interface IShowOptions {
    id?: string;
    portal?: string;
    externalId?: string;
    component: JSX.Element | React.StatelessComponent | React.ComponentClass;
}

export interface IPopover {
    id: string;
    portal: string;
    component: JSX.Element | React.StatelessComponent | React.ComponentClass;
    externalId?: string;
    hide?: (response?: any) => void;
}

export interface IPopoversStore {
    show(popover: IPopover): Promise<any>;
    hide(id: string, data?: any): void;
}

export class PopoverStore implements IPopoversStore {
    @observable private _openPopovers: ObservableMap<IPopover>;

    constructor() {
        this._openPopovers = observable.map<IPopover>();
    }

    @computed
    get renderedPopovers(): IPopover[] {
        return this._openPopovers.values();
    }

    isOpen(id: string): boolean {
        return this._openPopovers.has(id);
    }

    @action
    hide(id: string, data?: any) {
        if (this.isOpen(id)) {
            const popover = this._openPopovers.get(id);
            popover.hide(data);
        }
    }

    @action
    show(options: IShowOptions): Promise<any> {
        const id = options.id != null ? options.id : uuidv4();
        const portal = options.portal != null ? options.portal : 'default';

        if (this._openPopovers.has(id)) {
            warn(`popover with id ${id} is already opened, replacing the current popover.`);
        }

        return new Promise((resolve, reject) => {
            const popover: IPopover = {
                id,
                portal,
                externalId: options.externalId,
                component: options.component,
                hide: (data: any) => {
                    this._openPopovers.delete(id);
                    resolve(data);
                },
            };
            this._openPopovers.set(id, popover);
        });
    }

    @action
    toggle(popover: IPopover): void {
        const { id } = popover;

        if (this._openPopovers.has(id)) {
            this._openPopovers.delete(id);
        } else {
            this._openPopovers.set(id, popover);
        }
    }
}

const popovers = new PopoverStore();

export {
    popovers,
};
