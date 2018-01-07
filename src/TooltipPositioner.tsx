import * as React from 'react';
import { invariant } from './utils';
import { isOr } from './utils';
import { TooltipPosition } from './Tooltip';

export interface ITooltipPositionerProps {
    children: any;
    target: HTMLElement;
    position?: TooltipPosition;
}

export class TooltipPositioner extends React.Component<ITooltipPositionerProps, {targetBBox: ClientRect}> {
    private scrollCallback: () => void;

    constructor(props: ITooltipPositionerProps) {
        super(props);
        this.scrollCallback = null;
        this.state = {
            targetBBox: this.getTargetClientBbox(),
        };
    }

    render() {
        const { targetBBox } = this.state;
        const position = isOr(this.props.position, 'bottom');
        const positionerStyle = getPositionStyle(targetBBox, position);
        const tipStyle = getTipStyle(position);

        return (
            <div className="popover-positioner-wrapper" style={positionerStyle}>
                {
                    React.cloneElement(React.Children.only(this.props.children), {style: tipStyle})
                }
            </div>
        );
    }

    private getTargetClientBbox(): any {
        const { target } = this.props;
        invariant(target == null, 'cannot position tooltip becuase target is null');
        return target.getBoundingClientRect();
    }
}

export function getPositionStyle(targetBBox: ClientRect, position?: TooltipPosition): React.CSSProperties {
    const pos = isOr(position, 'bottom');
    const { width, height, top, left } = targetBBox;

    const style: React.CSSProperties = {
        position: 'fixed',
    };

    switch (pos) {
        case 'top':
            style.top = top - 10;
            style.left = (left + width / 2);
            style.transform = `translateY(-100%)`;
            return style;

        case 'right':
            style.left = left + width + 10;
            style.top = (top + height / 2);
            return style;

        case 'bottom':
            style.top = (top + height) + 10;
            style.left = (left + width / 2);
            return style;

        case 'left':
            style.top = (top + height / 2);
            style.left = left - 10;
            style.transform = `translateX(-100%)`;
            return style;

        default:
            invariant(true, `unrecognized tooltip position '${pos}'`);
    }
}

export function getTipStyle(position: TooltipPosition): React.CSSProperties {
    switch (position) {

        case 'top':
        case 'bottom':
            return {
                transform: `translateX(-50%)`,
            };

        case 'left':
        case 'right':
            return {
                transform: `translateY(-50%)`,
            };

        default:
            return {};
    }
}
