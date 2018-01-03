import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { popovers } from './PopoverStore';
import { invariant } from './utils';

export interface IPopoversPortalProps {

}

type OpenableStatelessComponent = React.StatelessComponent<{close?: (data: any) => void}>;

export const PopoversPortal = observer((props: IPopoversPortalProps) => {
    const portal = getPortalElement();

    return (ReactDOM as any).createPortal(
        popovers.renderedPopovers.map(popover => {
            const { id, component, onClose } = popover;

            const props = {
                key: id,
                close: onClose,
            };

            if (typeof component === 'string') {
                return React.cloneElement(component);
            } else if ((component as any).prototype && (component as any).prototype.render == null) {
                const StatelessComp = component as OpenableStatelessComponent;
                return <StatelessComp {...props} />;
            } else {
                const c = component as React.ReactElement<any>;
                return React.cloneElement(c, props);
            }
        }),
        portal,
    );
});

let portalDiv: HTMLElement;

function getPortalElement(): HTMLElement {
    if (portalDiv == null) {
        const el = document.getElementById('popovers-portal');
        invariant(el == null, 'Could not find div for popovers portal');
        portalDiv = el;
    }

    return portalDiv;
}
