# Mobx Portals

A module for managing portals.

A mobx-react library for managing popovers. A popover is any element that appears in the DOM and should render over the other UI elements. This could be a Tooltip, Modal, Dropdown, Flyover, etc.

## API

`portals.render(opts: IRenderOptions): IRenderResponse`

**IRenderOptions**

```ts
{
    id: string;
    portalKey: string;
    component: React.ReactNode;
}
```

**IRenderResponse**

 ```ts
 {
     unmount: (data: any) => void;
     waitForUnmount: Promise<any>;
 }
 ```

`portals.unmount(id: string, data: any): void`

## Usage

First, somewhere in your React tree, you must render a `Portal` component. You can render any number of portals in your tree. You will reference your portals by their `portalKey` later.

```ts
import { Portal } from 'mobx-portals';

class App extends React.Component<{}, {}> {
    
    render() {
        return (
            <div>
                <Portal portalKey="my-portal" />
            </div>
        );
    }
}
```

Now, *anywhere* in your code, you can render a component through your portal. We import the `portals` global instance and call the `render` method.

```ts
import { portals } from 'mobx-portals';
import { MyModal } from './MyModal';

const res = portals.render({
    id: 'myModal',
    portalKey: 'my-portal',
    component: MyModal,
});
```

When a component is rendered through a portal, a new prop named `unmount` is appended to its props. This can be used inside the component to unmount it.

```ts
export interface IMyModalProps {
    unmount?: (data: any) => void;
}

export class MyModal extends React.Component<IMyModalProps, {}> {

    render() {
        const handleClose = () => {
            const someData = { canceled: true };
            this.props.unmount(someData);
        };

        return (
            <div className="modal">
                <button onClick={handleClose}>
            </div>  
        );
    }
}
```

Now lets go have a look at the lines after the `portals.render` call in our other file.

```ts
import { portals } from 'mobx-portals';
import { MyModal } from './MyModal';

const res = portals.render({
    id: 'myModal',
    portalKey: 'my-portal',
    component: MyModal,
});

const data = await res.waitForUnmount;

console.log(data);
// { canceled: true }
```

### Tooltip

```typescript jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tooltip } from 'popovers';

const App = () => {
    return (
        <Tooltip content="The content for the tooltip">
            <div>
                This element has a tooltip.
            </div>
        </Tooltip>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));
```
