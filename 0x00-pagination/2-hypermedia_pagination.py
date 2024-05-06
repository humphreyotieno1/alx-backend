#!/usr/bin/env python3
'''server and index range'''
import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''get page'''
        assert isinstance(page, int) and page > 0, \
            "Page must be a positive integer."
        assert isinstance(page_size, int) and page_size > 0, \
            "Page size must be a positive integer."

        start, end = index_range(page, page_size)
        dataset = self.dataset()
        if start >= len(dataset):
            return []

        return dataset[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        '''dict with hypermedia pagination info'''
        dataset = self.get_page(page, page_size)
        total_pages = self.calculate_total_pages(page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            'page_size': len(dataset),
            'page': page,
            'data': dataset,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }

    def calculate_total_pages(self, page_size: int):
        '''total number of pages'''
        dataset = self.dataset()
        total_records = len(dataset)
        return -(-total_records // page_size)


def index_range(page: int, page_size: int) -> tuple:
    '''tuple with the start range and end'''
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
