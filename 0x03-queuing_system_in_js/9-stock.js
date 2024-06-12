import { createClient } from 'redis';

const { promisify } = require('util');
const express = require('express');
const redis = require('redis');

const listProducts = [
    {Id: 1, name: 'Suitcase 250', price: 50, stock: 4},
    {Id: 2, name: 'Suitcase 450', price: 100, stock: 10},
    {Id: 3, name: 'Suitcase 650', price: 350, stock: 2},
    {Id: 4, name: 'Suitcase 1050', price: 550, stock: 5}
];

function getItemById(id){
    listProducts.forEach(product => {
        if (product.id === id){
            return product;
        }
    });
}

//express server
const app = express();
const port = 1245;

app.get('/list_products', (req, res) => {
    return res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = req.params.itemId
    try {
        const item = await getCurrentReservedStockById(itemId);
        return res.json({itemId: item.Id, itemName: item.name, price: item.price, initialAvailableQuantity: item.stock});
    } catch (err) {
        return res.json({status: 'Product not found'});
    }
});

app.get(' /reserve_product/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    try {
        // return res.json(getCurrentReservedStockById(itemId));
        const item = await getCurrentReservedStockById(itemId);
        if (item.stock >= 1) {
            await reserveStockById(item.id, item.stock);
            return res.json({status: 'Reservation confirmed', itemId: item.id});
        } else {
            return res.json({status: 'Not enough stock available', itemId: item.id});
        }
    } catch (err) {
        return res.json({status: 'Product not found'});
    }
});

app.listen(port);

//redis client
const redisClient = createClient();

redisClient.on('error', (error) => {
    console.log('Redis client not connected to the server: ', error.toString());
});

const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.set).bind(redisClient);

async function reserveStockById(itemId, stock){
    return await setAsync(itemId, stock);
}

async function getCurrentReservedStockById(itemId){
    try {
        const value = await getAsync(itemId);
        return value;
    } catch (err) {
        throw new Error('Error retrieving value from Redis cache');
    }
}
