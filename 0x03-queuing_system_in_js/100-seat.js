import { createClient } from "redis";
const redis = require('redis');
const { promisfy } = require('util');
const express = require('express');
const kue = require('kue');

//create redis client
const client = createClient();

function reserveSeat(number){
    client.set('available_seats', number, redis.print)
}

function getCurrentAvailableSeats() {
    const promiseGet = promisfy(client.get).bind(client);
    return promiseGet('available_seats');
}

let reservationEnabled = true;
reserveSeat(50);

//create queue and express server
const app = express();
const queue = kue.createQueue();

app.get('/available_seats', async (req, res) => {
    const seats = await getCurrentAvailableSeats();
    return res.json({numberOfAvailableSeats: seats});
});

app.get('/reserve_seat', (req, res) => {
    if (!reservationEnabled) {
        return res.json({status: 'Reservation are blocked'});
    }
    const job = queue.create('reserve_seat').save((err) => {
        if (err) {
            return res.json({status: 'Reservation failed'});
        }
        return res.json({status: 'Reservation in process'});
    });

    job.on('complete', () => {
        console(`Seat reservation job ${job.id} completed`);
    });

    job.on('failed', (err) => {
        console.log(`Seat reservation job ${job.id} failed: ${err}`);
    });
});

app.get('/process', (req, res) => {
    queue.process('reserve_seat', async (job, done) => {
        const [seats] = await Promise.allSettled([getCurrentAvailableSeats()]);

        const seatValues = Number(seats.value)
        reserveSeat( seatValues - 1 );

        const [newAvailable] = await Promise.allSettled([getCurrentAvailableSeats]);
        const newAvailableSeats = Number(newAvailable.value);

        if (newAvailableSeats > -1) {
            done();
        } else {
            done(new Error("Not enough seats available"));
        }

        if (newAvailableSeats <= 0) {
            reservationEnabled = false;
        }
    });
    res.json({ status: "Queue processing" });
})
