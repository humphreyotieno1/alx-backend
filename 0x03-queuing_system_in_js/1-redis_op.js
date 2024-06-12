import { createClient } from "redis";

const redisClient = createClient()

redisClient.on('error', (error) => {
  console.log('Redis client not connected to the server: ', error.toString());
});

redisClient.on('connect', () => {
  console.log('Redis client connected to server');
});

function setNewSchool(schoolName, value) {
  redisClient.set(schoolName, value, redis.print)
}

function displaySchoolValue(schoolName) {
  redisClient.get(schoolName, (err, value) => {
    if (err) {
        console.log(err.toString());
    } else {
        console.log(value);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFransisco');
