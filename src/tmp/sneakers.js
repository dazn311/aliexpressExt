const sneakersObj = {
    3256807259722145: {
        "response": {
            "productId": "3256807259722145",
            "title": "Men's Running Shoes Air Cushion Men's Spring and Autumn New Trendy Breathable Soft Bottom Men's Casual Sneaker - AliExpress 322",
            "description": "Buy Men's Running Shoes Air Cushion Men's Spring and Autumn New Trendy Breathable Soft Bottom Men's Casual Sneaker at Aliexpress for . Find more 322, 201531001 and  products. Enjoy ✓Free Shipping Worldwide! ✓Limited Time Sale ✓Easy Return. ",
            "specification": "",
            "image": "https://ae04.alicdn.com/kf/S41d226be34234b8b9c3a07658de926d2N.jpg_640x640.jpg_.webp",
            "keyword": "、201531001、322",
            "link": "https://www.aliexpress.com/item/3256807259722145.html",
            "media": []
        }
    }
};

export const sneakers = (productId='3256807259722145') => {
    return sneakersObj[productId] ?? sneakersObj['3256807259722145'];
};