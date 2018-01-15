import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { popovers } from './PopoverStore';
import { invariant } from './utils';

export interface IPopoversPortalProps {
    externalId: string;
}

type OpenableStatelessComponent = React.StatelessComponent<{close?: (data: any) => void}>;

export const ExternalPortal = observer((props: IPopoversPortalProps) => {
    const thisPortalId = props.externalId;
    const portal = getPortalElement(thisPortalId);

    return (ReactDOM as any).createPortal(
        popovers.renderedPopovers.map(popover => {
            const { id, component, hide, externalId } = popover;
            if (externalId == null || externalId !== thisPortalId) return null;

            const props = {
                key: id,
                hide: hide,
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

function getPortalElement(id: string): HTMLElement {
    if (portalDiv == null) {
        const el = document.getElementById(id);
        invariant(el == null, `could not find node with id '${id}'`);
        portalDiv = el;
    }

    return portalDiv;
}
