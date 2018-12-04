import { observer } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { portals } from './Portals';
import { cloneElementWithProps, invariant } from './utils';

export interface IPortalProps {
    portalKey?: string;
    toExternalId?: string;
    style?: React.CSSProperties;
    className?: string;
}

export const Portal = observer((props: IPortalProps) => {
    const portalKey = props.portalKey || 'default';

    if (props.toExternalId != null) {
        const portal = getPortalElement(props.toExternalId);
        return (ReactDOM as any).createPortal(
            renderPortedComponents(portalKey),
            portal,
        );
    }

    return (
        <div
            id={portalKey}
            className={props.className}
            style={props.style}
        >
            { renderPortedComponents(portalKey) }
        </div>
    )
});

function renderPortedComponents(portalKey: string): any {
    return portals.portedComponents.map(ported => {
        const { id, component, unmount } = ported;

        if (portalKey !== ported.portalKey) return null;

        const props = {
            key: id,
            unmount,
        };

        return cloneElementWithProps(component, props);
    })
}

let portalDiv: HTMLElement;
function getPortalElement(id: string): HTMLElement {
    if (portalDiv == null) {
        const el = document.getElementById(id);
        invariant(el == null, `could not find node with id '${id}'`);
        portalDiv = el;
    }
    return portalDiv;
}
