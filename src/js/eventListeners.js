'use strict';
import { dynamicallySizeGameElements, dynamicallySizeLargeImageViewer } from './dynamicResizeUtilities';

const registeredEvents = {};

const registerEventListeners = () => {
    if (!registeredEvents.resize) {
        window.addEventListener(
            'resize',
            (event) => {
                dynamicallySizeGameElements();
                dynamicallySizeLargeImageViewer();
            }
        );
        registeredEvents.resize = true;
    }
}

window.registerEventListeners = registerEventListeners;
