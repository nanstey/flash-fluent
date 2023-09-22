import type { PageServerLoad } from './$types';

export const load = (async ({params, fetch}) => {
    const {deckSize, deckNumber} = params;
    const offset = (Number(deckNumber) - 1) * Number(deckSize);
    const response = await fetch(`http://localhost:8080/api?limit=${deckSize}&offset=${offset}`);
    const words = await response.json();

    return { 
        words
    };
}) satisfies PageServerLoad;
