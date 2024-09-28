'use server'
import {searchItems} from '@/api/searchItems';

export async function getNextItems(props) {
    const results = await searchItems(props);

    if (!results) {
        return null;
    }

    return results;
}