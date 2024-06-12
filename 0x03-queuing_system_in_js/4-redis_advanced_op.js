import { createClient } from "redis";
const redis = require('redis');

const redisClient = createClient();

redisClient.on('error', (error) => {
    console.log('Redis client not connected to the server: ', error.toString());
});

redisClient.on('connect', () => {
    console.log('Redis client connected to server');
    createHash();
    redisClient.hgetall('HolbertonSchools', (err, reply) => {
        if (err){
            console.log('Error:', err.toString());
        } else {
            console.log(reply);
        }      
    })
});

const createHash = () => {
    redisClient.hset(
      'HolbertonSchools',
      'Portland', 50,
      redis.print
    );
    redisClient.hset(
      'HolbertonSchools',
      'Seattle', 80,
      redis.print
    );
    redisClient.hset(
      'HolbertonSchools',
      'New York', 20,
      redis.print
    );
    redisClient.hset(
      'HolbertonSchools',
      'Bogota', 20,
      redis.print
    );
    redisClient.hset(
      'HolbertonSchools',
      'Cali', 40,
      redis.print
    );
    redisClient.hset(
      'HolbertonSchools',
      'Paris', 2,
      redis.print
    );
  };
  