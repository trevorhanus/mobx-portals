import * as React from 'react';
import { action, computed, observable, ObservableMap, runInAction } from 'mobx';
import { warn } from './utils';
import { v4 as uuidv4 } from 'uuid';

export interface IPopoverProps {
    children?: React.ReactNode;
    close?: (data?: any) => void; // popover must call this to be closed
}

export interface IOpenOptions {
    component: JSX.Element | React.StatelessComponent | React.ComponentClass;
    id?: string;
}

export interface IPopover {
    id: string;
    component: JSX.Element | React.StatelessComponent | React.ComponentClass;
    onClose?: (data?: any) => void;
}

export interface IPopoversStore {
    open(popover: IPopover): Promise<any>;
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
    close(id: string) {
        const popover = this._openPopovers.get(id);
        popover.onClose();
    }

    @action
    open(options: IOpenOptions): Promise<any> {
        const id = options.id != null ? options.id : uuidv4();

        if (this._openPopovers.has(id)) {
            warn(`popover with id ${id} is already opened, replacing the current popover.`);
        }

        return new Promise((resolve, reject) => {
            const popover: IPopover = {
                id,
                component: options.component,
                onClose: (data: any) => {
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
