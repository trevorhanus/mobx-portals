import { observer } from 'mobx-react';
import * as React from 'react';
import { popovers } from './PopoverStore';
import { ReactElement } from 'react';
import { ExternalPortal } from './ExternalPortal';

export interface IPortalProps {
    id?: string;
    toExternalId?: string;
}

type OpenableStatelessComponent = React.StatelessComponent<{close?: (data: any) => void}>;

export const Portal = observer((props: IPortalProps) => {
    if (props.toExternalId != null) {
        return <ExternalPortal externalId={props.toExternalId} />
    }
    const portalId = props.id != null ? props.id : 'default';

    return (
        <div id={portalId}>
            {
                popovers.renderedPopovers.map(popover => {
                    const { id, portal, component, hide } = popover;

                    if (portal !== portalId) return null;

                    const props = {
                        key: id,
                        hide: hide,
                    };

                    if (isDOMTypeElement(component)) {
                        return React.cloneElement(component as ReactElement<any>, {key: id});
                    } else if ((component as any).prototype && (component as any).prototype.render == null) {
                        const StatelessComp = component as OpenableStatelessComponent;
                        return <StatelessComp {...props} />;
                    } else {
                        const c = component as React.ReactElement<any>;
                        return React.cloneElement(c, props);
                    }
                })
            }
        </div>
    )
});

function isElement(element) {
    return React.isValidElement(element);
}

function isDOMTypeElement(element) {
    return isElement(element) && typeof element.type === 'string';
}