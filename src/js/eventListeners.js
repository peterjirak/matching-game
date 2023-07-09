'use strict';
import { dynamicallySizeGameElements } from './dynamicResizeUtilities';

const registeredEvents = {};

const registerEventListeners = () => {
    if (!registeredEvents.resize) {
        window.addEventListener(
            'resize',
            (event) => {
                dynamicallySizeGameElements();
            }
        );
        registeredEvents.resize = true;
    }
}

window.registerEventListeners = registerEventListeners;
