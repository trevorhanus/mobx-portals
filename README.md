# Popovers

A mobx-react library for managing popovers. A popover is any element that appears in the DOM and should render over the other UI elements. This could be a Tooltip, Modal, Dropdown, Flyover, etc.

## Usage

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