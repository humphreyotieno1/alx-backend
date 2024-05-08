#!/usr/bin python3
'''LIFO caching'''
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    '''LIFOCache class inheriting from BaseCaching'''
    def __init__(self):
        '''Initialize'''
        super().__init__()
        self.stack = []

    def put(self, key, item):
        '''Add an item'''
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            '''remove first item'''
            first_key = self.stack.pop(0)
            del self.cache_data[first_key]
            print("DISCARD:", first_key)

        self.cache_data[key] = item
        self.stack.append(key)

    def get(self, key):
        '''Get an item'''
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
