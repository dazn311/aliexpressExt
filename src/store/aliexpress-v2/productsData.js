import {data} from './searchSneakers.js';
import data2TShirts from './searchTShirts.js';
import data2Shorts from './searchShorts.js';

export const productsDataObj = {
    Sneakers:data.content,
    TShirts:data2TShirts.content,
    Shorts:data2Shorts.content,
};