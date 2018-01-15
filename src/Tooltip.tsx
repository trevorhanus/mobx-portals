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
    disable?: boolean;
    hideOnClick?: boolean;
    portal?: string;
}

export class Tooltip extends React.Component<ITooltipProps, {}> {
    private childRef: HTMLElement;
    private tooltipId: string;
    private mouseleaveCallback: (e: Event) => void;

    constructor(props: ITooltipProps) {
        super(props);
        this.childRef = null;
        this.tooltipId = uuidv4();
    }

    componentWillUnmount() {
        this.closeTooltip();
    }

    componentWillReceiveProps(newProps: ITooltipProps) {
        if (newProps.disable) {
            this.closeTooltip();
        }
    }

    render() {
        const { children } = this.props;

        if (!React.isValidElement(children)) {
            warn(`tooltips only work with valid elements`);
        }

        if (typeof (this.props.children as any).type === 'function') {
            warn(`tooltips only work with valid elements`);
        }

        const childProps = {
            ref: node => this.childRef = node,
            onMouseEnter: this.handleMouseEnter.bind(this),
            onClick: this.handleClick.bind(this),
        };

        return (
            React.cloneElement(React.Children.only(children), childProps)
        );
    }

    showTooltip() {
        if (this.props.disable === true) return;
        
        const { content } = this.props;

        const portalId = isOr(this.props.portal, 'tooltips');
        const position = isOr(this.props.position, 'bottom');
        const id = this.tooltipId;
        const tipClassName = classNames('mp-tooltip', tipArrowClassName(position));
        const tip = <div className={tipClassName}>{ content }</div>;

        popovers.show({
            id,
            portal: portalId,
            component: (
                <TooltipPositioner target={this.childRef} position={position}>
                    { tip }
                </TooltipPositioner>
            ),
        });
    }

    closeTooltip() {
        if (popovers.isOpen(this.tooltipId)) {
            popovers.hide(this.tooltipId);
        }
    }

    handleClick(e: React.MouseEvent<any>) {
        const hideOnClick = isOr(this.props.hideOnClick, true);
        if (hideOnClick) {
            this.closeTooltip();
        }
        // need to call the onClick handler on the children
        const child = React.Children.only(this.props.children);
        const onClick = child.props.onClick;
        if (onClick != null) {
            onClick(e);
        }
    }

    handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
        if (this.props.disable === true) return;
        
        // set up a 'mouseleave' event on target because React's onMouseLeave is unreliable
        const target = e.currentTarget;
        this.mouseleaveCallback = this.handleMouseLeave.bind(this);
        target.addEventListener('mouseleave', this.mouseleaveCallback);
        this.showTooltip();
    }

    handleMouseLeave(e: Event) {
        e.target.removeEventListener('mouseleave', this.mouseleaveCallback);
        this.mouseleaveCallback = null;
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
