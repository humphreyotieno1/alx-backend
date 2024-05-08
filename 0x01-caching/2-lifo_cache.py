#!/usr/bin python3
'''LIFO caching'''
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    '''LIFOCache class that inherits from BaseCaching'''

    def __init__(self):
        '''Initialize'''
        super().__init__()
        self.stack = []

    def put(self, key, item):
        '''Add an item to the cache'''
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            '''Remove the last item'''
            last_key = self.stack.pop()
            del self.cache_data[last_key]
            print("DISCARD:", last_key)

        self.cache_data[key] = item
        self.stack.append(key)

    def get(self, key):
        '''Get an item by key'''
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
