#!/usr/bin python3
'''FIFO caching'''
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    '''FIFOCache class inheriting from BaseCaching'''
    def __init__(self):
        '''Initialize'''
        super().__init__()
        self.queue = []

    def put(self, key, item):
        '''Add an item'''
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            '''remove first item'''
            first_key = self.queue.pop(0)
            del self.cache_data[first_key]
            print("DISCARD:", first_key)

        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        '''Get an item'''
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
