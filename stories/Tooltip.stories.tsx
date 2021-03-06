import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tooltip } from '../src/Tooltip';
import { Portal } from '../src/Portal';

import './style.scss';

storiesOf('Tooltip', module)

    .add('default (bottom)', () => {

        return (
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />
                <Tooltip content="This is a tip.">
                    <span>Hover Me</span>
                </Tooltip>
            </div>
        );
    })

    .add('positions', () => {

        return (
            <div>
                <Portal portalKey="tooltips"/>
                <div className="sb-center-content">
                    <Tooltip content="This is a tip.">
                        <span style={{marginRight: '2em'}}>Bottom</span>
                    </Tooltip>
                    <Tooltip content="This is a tip." position="right">
                        <span style={{marginRight: '2em'}}>Right</span>
                    </Tooltip>
                    <Tooltip content="This is a tip." position="top">
                        <span style={{marginRight: '2em'}}>Top</span>
                    </Tooltip>
                    <Tooltip content="This is a tip." position="left">
                        <span>Left</span>
                    </Tooltip>
                </div>
            </div>
        );
    })

    .add('can disable', () => {

        return (
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />
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
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />
                <div className="story-hint">You should see a warning in the console.</div>
                <Tooltip content="This is a tip.">
                    <Stateless />
                </Tooltip>
            </div>
        );
    })
    
    .add('hides when target unmounts', () => {

        return (
            
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />

                <div className="story-hint">
                    hit 'Return' to show and hide the button
                    <br />
                    the tooltip should unmount as the button does
                </div>

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
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />
                <DisableOnEnter />
            </div>
        );
    })

    .add('hides when target is clicked', () => {

        return (
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />

                <div className="story-hint">Click the button, the tooltip should hide.</div>

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
            <div className="sb-center-content">
                <Portal portalKey="tooltips" />

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
