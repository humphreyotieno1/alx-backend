#!/usr/bin/python3
'''implement a caching system'''
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    '''inherits from BaseCaching'''
    def put(self, key, item):
        '''add item in the cache'''
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        '''get an item by key'''
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
