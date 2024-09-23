'use server'
import {searchItems} from '@/api/searchItems';

export async function getNextItems(searchTerm,page=1) {
    const results = await searchItems(searchTerm,page);

    if (!results) {
      return [];
    }
  
    return results;
}