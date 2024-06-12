import { createClient } from "redis";
const redis = require('redis')
const promisify = require('util').promisify

const redisClient = createClient();
const promise = promisify(redisClient.get).bind(redisClient);

redisClient.on('error', (error) => {
    console.log('Redis client not connected to the server: ', error.toString());
});

redisClient.on('connect', async () => {
    console.log('Redis client connected to server');
    await main();
});

function setNewSchool(schoolName, value) {
    redisClient.set(schoolName, value, redis.print)
}

async function displaySchoolValue(schoolName) {
    try {
        console.log(await promise(schoolName));
    } catch (error) {
        console.log(error);
    }
}



async function main () {
    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');

}
