'use strict';

const events = require('./events');

const { v4: uuid } = require('uuid');

const { faker } = require('@faker-js/faker');

require('./driver');

events.on('pickup', notifyPickup);

function notifyPickup(payload) {
    console.log('EVENT', {
        event: 'pickup',
        time: new Date().toLocaleString(),
        payload: payload,
    });
}

setInterval(() => {
    console.log('---------------------------------------------------------');
    let orderID = uuid();
    let payload = {
        store: '1-206-flowers',
        orderID: orderID,
        customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: faker.address.city()
    }
    events.emit('pickup', payload);
}, 10000);

events.on('delivered', notifyDelivered);

function notifyDelivered(payload) {
    setTimeout(() => {
        console.log(`VENDOR: Thank you for delivering ${payload['customer']}`);
    }, 4000);
}
