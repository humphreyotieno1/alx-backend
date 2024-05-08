#!/usr/bin/python3
'''MRU Caching'''
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    '''MRUCache class that inherits from BaseCaching'''

    def __init__(self):
        '''Initialize'''
        super().__init__()
        self.queue = []

    def put(self, key, item):
        '''Add an item to the cache'''
        if key is None or item is None:
            return

        if key in self.cache_data:
            '''Move the key to the front of the queue'''
            self.queue.remove(key)
        elif len(self.cache_data) >= self.MAX_ITEMS:
            '''Remove the most recently used item (MRU)'''
            mru_key = self.queue.pop()
            del self.cache_data[mru_key]
            print('DISCARD:', mru_key)

        self.cache_data[key] = item
        self.queue.insert(0, key)

    def get(self, key):
        '''Get an item by key'''
        if key is None or key not in self.cache_data:
            return None

        '''Move the key to the front of the queue'''
        self.queue.remove(key)
        self.queue.insert(0, key)

        return self.cache_data[key]
