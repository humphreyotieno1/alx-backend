#!/usr/bin/python3
"""LFU caching module"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """impliments the LFU policy"""
    def __init__(self):
        """initialisation method"""
        super().__init__()
        self.key_frequency = {}

    def put(self, key, item):
        """assigns key value to caching dictionary"""
        if key is None or item is None:
            pass
        else:
            if key not in self.key_frequency.keys():
                self.key_frequency[key] = 1
            else:
                self.key_frequency[key] += 1
            self.cache_data[key] = item

            if len(self.key_frequency) > self.MAX_ITEMS:
                least_frequent = min(
                    self.key_frequency, key=self.key_frequency.get)
                del self.key_frequency[least_frequent]
                del self.cache_data[least_frequent]
                print("DISCARD: {}".format(least_frequent))

    def get(self, key):
        """gets the value of key"""
        if key:
            if key in self.key_frequency.keys():
                self.key_frequency[key] += 1

            try:
                return self.cache_data[key]
            except Exception as e:
                return None
        return None
