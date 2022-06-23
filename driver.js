'use strict';

const events = require('./events');

events.on('pickup', notifyPickup);

events.on('in-transit', notifyTransit);

events.on('delivered', notifyDelivered);

function notifyPickup(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload['orderID']}`);
        events.emit('in-transit', payload);
    }, 4000);
}

function notifyTransit(payload) {
    console.log('EVENT', {
        event: 'in-transit',
        time: new Date().toLocaleString(),
        payload: payload,
    });
    events.emit('delivered', payload);
}

function notifyDelivered(payload) {
    setTimeout(() => {
        console.log(`DRIVER: delivered up ${payload['orderID']}`);
        console.log('EVENT', {
            event: 'delivered',
            time: new Date().toLocaleString(),
            payload: payload,
        });
    }, 4000);
}



