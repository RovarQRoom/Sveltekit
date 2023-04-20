import algoliasearch from 'algoliasearch';

let process: any;

const ENVIROMENT = process?.env ? process.env : import.meta.env;


export const algoliaConfig = {
    algoliaSerach: algoliasearch(
        ENVIROMENT.VITE_ALGOLIA_API_KEY,
        ENVIROMENT.VITE_ALGOLIA_INDICES_API_KEY
    )
};
