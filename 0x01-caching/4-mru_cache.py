#!/usr/bin/python3
'''MRU Caching'''
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache class that inherits from BaseCaching """

    def __init__(self):
        """ Initialize """
        super().__init__()

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        self.cache_data[key] = item

        if len(self.cache_data) > self.MAX_ITEMS:
            mru_key = self.get_mru_key()
            del self.cache_data[mru_key]
            print("DISCARD:", mru_key)

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]

    def get_mru_key(self):
        """ Get the key of the most recently used item """
        return next(reversed(self.cache_data))
