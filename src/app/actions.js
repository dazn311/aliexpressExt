'use server'
import {searchItems} from '@/api/searchItems';
import {revalidatePath} from 'next/cache';

export async function getNextItems(props) {
    try {
        return await searchItems(props);
    }catch (e) {
        throw new Error(`${e}`);
    }
    revalidatePath(`/search${props.searchTerm}`,'page');
}

//if (!results) {
//         return null;
//     }
//
//     return results;