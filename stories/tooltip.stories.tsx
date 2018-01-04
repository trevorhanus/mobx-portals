import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tooltip } from '../src/Tooltip';
import { PopoversPortal } from '../src/PopoversPortal';

import './style.scss';

storiesOf('Tooltip', module)

    .add('default (bottom)', () => {

        return (
            <div>
                <PopoversPortal />
                <Tooltip content="This is a tip.">
                    <span>Hover Me</span>
                </Tooltip>
            </div>
        );
    })

    .add('can disable', () => {

        return (
            <div>
                <PopoversPortal />
                <Tooltip content="This is a tip." disable={true}>
                    <span>Hover Me, My Tooltip is Disabled</span>
                </Tooltip>
            </div>
        );
    })

    .add('warns when child is stateless', () => {

        const Stateless = () => {
            return <div>I'm Stateless.</div>;
        };

        return (
            <div>
                <PopoversPortal />
                <div>You should see a warning in the console.</div>
                <Tooltip content="This is a tip.">
                    <Stateless />
                </Tooltip>
            </div>
        );
    })
    
    .add('hides when target unmounts', () => {

        return (
            
            <div>
                <PopoversPortal />

                <div>hit 'Return' to show and hide the button</div>
                <div>the tooltip should unmount as the button does</div>

                <HideChildrenOnSpace>
                    <Tooltip content="This is a tip.">
                        <button>Hover Me</button>
                    </Tooltip>
                </HideChildrenOnSpace>
            </div>
        );
    })

    .add('hides when disabled prop is updated', () => {

        return (
            <div>
                <PopoversPortal />
                <DisableOnEnter />
            </div>
        );
    })

    .add('hides when target is clicked', () => {

        return (
            <div>
                <PopoversPortal />

                <div>hit 'Return' to show and hide the button</div>
                <div>the tooltip should unmount as the button does</div>

                <HideChildrenOnSpace>
                    <Tooltip content="This is a tip." hideOnClick={true}>
                        <button>Hover Me</button>
                    </Tooltip>
                </HideChildrenOnSpace>
            </div>
        );
    })
    
    .add('still calls targets onClick handler', () => {

        return (
            <div>
                <PopoversPortal />

                <div>This button logs onClick. Clicking it should hide the toolitp and log an action.</div>

                <HideChildrenOnSpace>
                    <Tooltip content="This is a tip." hideOnClick={true}>
                        <button onClick={action('clicked')}>Click Me</button>
                    </Tooltip>
                </HideChildrenOnSpace>
            </div>
        );
    });

class HideChildrenOnSpace extends React.Component<{}, {show: boolean}> {
    private handleKeydownCallback: () => void;

    constructor(props: {}) {
        super(props);
        this.state = {
            show: true,
        }
    }

    componentWillMount() {
        this.handleKeydownCallback = this.handleKeydown.bind(this);
        window.addEventListener('keydown', this.handleKeydownCallback);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydownCallback);
    }

    render() {
        return this.state.show
        ? <div>{ this.props.children }</div>
        : null;
    }

    private handleKeydown(e: React.KeyboardEvent<any>) {
        if (e.keyCode === 13) {
            this.setState({
                show: !this.state.show,
            });
        }
    }
}

class DisableOnEnter extends React.Component<{}, {disable: boolean}> {
    private handleKeydownCallback: () => void;

    constructor(props: {}) {
        super(props);
        this.state = {
            disable: false,
        }
    }

    componentWillMount() {
        this.handleKeydownCallback = this.handleKeydown.bind(this);
        window.addEventListener('keydown', this.handleKeydownCallback);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydownCallback);
    }

    render() {
        return (
            <Tooltip disable={this.state.disable} content="I'm a tip">
                <button>Hover Me</button>
            </Tooltip>
        );
    }

    private handleKeydown(e: React.KeyboardEvent<any>) {
        if (e.keyCode === 13) {
            this.setState({
                disable: !this.state.disable,
            });
        }
    }
}
