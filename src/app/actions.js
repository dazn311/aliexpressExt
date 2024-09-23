'use server'
import {searchItems} from '@/api/searchItems';

export async function getNextItems(genre,page=1) {
    const {result} = await searchItems(genre,page);

    if (result?.status?.data !== 'success') {
      return [];
    }
  
    return result['resultList'];
}