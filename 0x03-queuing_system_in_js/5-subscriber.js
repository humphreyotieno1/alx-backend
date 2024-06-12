import { createClient } from "redis";

const subscriber = createClient()
const channel01 = 'holberton school channel';

subscriber.on('error', (err) => {
    console.log('Redis client not connected to the server: ', err.toString())
});

subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
    subscribed();
});

function subscribed(){
    subscriber.subscribe(channel01);
    subscriber.on('message', (channel, message) => {
        if (channel === channel01) {
            console.log(message);
            if (message === 'KILL_SERVER'){
                subscriber.unsubscribe(channel01);
                subscriber.quit();
            }
        }
    });
}
