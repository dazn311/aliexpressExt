import {data} from './searchSneakers.js';
import data2TShirts from './searchTShirts.js';
import data2Shorts from './searchShorts.js';
import {productsDataObj2} from "@/store/aliexpress-v2/productsData2";
import {productsDataObj3} from "@/store/aliexpress-v2/productsData3";

export const productsDataObj = {
    Sneakers:[
        ...data.content,
        ...productsDataObj2.Sneakers,
        ...productsDataObj3.Sneakers,
    ],
    TShirts:[...data2TShirts.content,
        ...productsDataObj2.TShirts,
        ...productsDataObj3.TShirts,
    ],
    Shorts:[...data2Shorts.content,
        ...productsDataObj2.Shorts,
        ...productsDataObj3.Shorts,
    ]
};