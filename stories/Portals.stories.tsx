import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { portals } from '../src/Portals';
import { Portal } from '../src/Portal';

import './style.scss';

// append the div for testing external portals
const EXTERNAL_PORTAL_ID = 'external-portal';
const node = document.getElementById(EXTERNAL_PORTAL_ID);
if (node == null) {
    const div = document.createElement('div');
    div.setAttribute('id', EXTERNAL_PORTAL_ID);
    document.body.appendChild(div);
}

storiesOf('Portals', module)

    .add('Named Portal', () => {
        const showModal = () => {
            portals.render({
                id: 'myModal',
                portalKey: 'my-portal',
                component: <div>Hi, I'm the modal!</div>
            });
        };

        const hideModal = () => {
            portals.unmount('myModal');
        };

        return (
            <div>
                <button onClick={showModal}>Show Modal</button>
                <button onClick={hideModal}>Hide Modal</button>
                <Portal portalKey="my-portal" />
            </div>
        );
    })

    .add('Default Portal', () => {
        const showModal = () => {
            portals.render({
                id: 'myModal',
                component: <div>Hi, I'm the modal!</div>
            });
        };

        const hideModal = () => {
            portals.unmount('myModal');
        };

        return (
            <div>
                <button onClick={showModal}>Show Modal</button>
                <button onClick={hideModal}>Hide Modal</button>
                <Portal />
            </div>
        );
    })

    .add('Hide from ported component', () => {
        const Modal = (props: { unmount?: () => void }) => {
            return (
                <div>
                    <button onClick={props.unmount}>Hide</button>
                    With this one, you can hide it by clicking the button.
                </div>
            )
        };

        const showModal = () => {
            portals.render({
                id: 'myModal',
                component: <Modal />
            });
        };

        return (
            <div>
                <button onClick={showModal}>Show Modal</button>
                <Portal />
            </div>
        );
    })

    .add('to external node', () => {
        const Modal = (props: {unmount?: () => void}) => {
            return (
                <div>
                    <button onClick={props.unmount}>Hide</button>
                    With this one, you can hide it by clicking the button.
                </div>
            )
        };

        const showModal = () => {
            portals.render({
                id: 'myModal',
                portalKey: 'external_portal',
                component: <Modal />
            });
        };

        return (
            <div>
                <Portal portalKey="external_portal" toExternalId={EXTERNAL_PORTAL_ID}/>
                <button onClick={showModal}>Show Modal (external)</button>
            </div>
        );
    })

    .add('add style and className to portal', () => {
        const Modal = (props: {unmount?: () => void}) => {
            return (
                <div>
                    <button onClick={props.unmount}>Hide</button>
                    With this one, you can hide it by clicking the button.
                </div>
            )
        };

        const showModal = () => {
            portals.render({
                id: 'myModal',
                portalKey: 'right-portal',
                component: <Modal />
            });
        };

        return (
            <div>
                <Portal
                    portalKey="right-portal"
                    className="portal"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: '300px',
                        height: '300px',
                        backgroundColor: '#4bb4ff',
                    }}
                />
                <button onClick={showModal}>Show Modal in Portal</button>
            </div>
        );
    });
