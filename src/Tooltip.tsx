import * as React from 'react';
import { popovers, IPopoverProps } from './PopoverStore';
import { warn } from './utils';
import { TooltipPositioner } from './TooltipPositioner';
import * as classNames from 'classnames';
import { isOr } from './utils';
import { v4 as uuidv4 } from 'uuid';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface ITooltipProps extends IPopoverProps {
    content: string | JSX.Element;
    position?: TooltipPosition;
    delay?: number;
}

export class Tooltip extends React.Component<ITooltipProps, {}> {
    private childRef: HTMLElement;
    private tooltipId: string;
    private mouseIsOver: boolean;

    constructor(props: ITooltipProps) {
        super(props);
        this.childRef = null;
        this.tooltipId = uuidv4();
        this.mouseIsOver = false;
    }

    componentWillUnmount() {
        this.closeTooltip();
    }

    render() {
        const { children } = this.props;
        
        const childProps = {
            ref: node => this.childRef = node,
            onMouseEnter: this.handleMouseEnter.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this),
        };

        if (!React.isValidElement(children)) {
            warn(`tooltips only work with valid elements`);
        }

        if (typeof (this.props.children as any).type === 'function') {
            warn(`tooltips only work with valid elements`);
        }

        return (
            React.cloneElement(React.Children.only(children), childProps)
        );
    }

    showTooltip() {
        if (!this.mouseIsOver) return;

        const { content } = this.props;
        const position = isOr(this.props.position, 'bottom');
        const id = this.tooltipId;
        const tipClassName = classNames('mp-tooltip', tipArrowClassName(position));
        const tip = <div className={tipClassName}>{ content }</div>;

        popovers.open({
            id,
            component: (
                <TooltipPositioner target={this.childRef} position={position}>
                    { tip }
                </TooltipPositioner>
            ),
        });
    }

    closeTooltip() {
        if (popovers.isOpen(this.tooltipId)) {
            popovers.close(this.tooltipId);
        }
    }

    handleMouseEnter() {
        this.mouseIsOver = true;
        this.showTooltip();
    }

    handleMouseLeave() {
        this.mouseIsOver = false;
        this.closeTooltip();
    }
}

function tipArrowClassName(tipPosition: TooltipPosition): string {
    switch (tipPosition) {

        case 'top':
            return 'arrow-bottom-center';

        case 'right':
            return 'arrow-left-center';

        case 'bottom':
            return 'arrow-top-center';

        case 'left':
            return 'arrow-right-center';

        default:
            return '';
    }
}
