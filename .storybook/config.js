import { configure } from '@storybook/react';

// append the div for the popovers-portal
const div = document.createElement('div');
div.setAttribute('id', 'popovers-portal');
document.body.appendChild(div);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
