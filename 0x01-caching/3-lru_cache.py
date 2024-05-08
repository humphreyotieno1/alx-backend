#!/usr/bin/python3
'''LRU Caching'''
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    '''LRUCache class that inherits from BaseCaching'''

    def __init__(self):
        '''Initialize'''
        super().__init__()
        self.queue = []

    def put(self, key, item):
        '''Add an item to the cache'''
        if key is None or item is None:
            return

        if key in self.cache_data:
            '''Move the key to the front'''
            self.queue.remove(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            '''Remove the least recently used'''
            lru_key = self.queue.pop(0)
            del self.cache_data[lru_key]
            print("DISCARD:", lru_key)

        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        '''Get an item by key'''
        if key is None or key not in self.cache_data:
            return None

        '''Move the key to the end of the queue'''
        self.queue.remove(key)
        self.queue.append(key)

        return self.cache_data[key]
