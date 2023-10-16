import axios, { 
    AxiosResponse, 
    AxiosError, 
    AxiosRequestConfig, 
    AxiosPromise }
from 'axios';


const url : String = 'http://0.0.0.0:4000';
const blocksRoute = '/blocks';
const transactionsRoute = '/transactions';

async function fetchBlocks() {
    try {
    const result = await axios.get(url + blocksRoute + '/all');
    console.log('@');
    console.log(result);
    return result.data;
    } catch(error){console.log(error)}
};

async function fetchTransactions() {
    try {
    const result = await axios.get(url + transactionsRoute + '/all');
    console.log('@');
    console.log(result);
    return result.data;
    } catch(error){console.log(error)}
};

export { url, blocksRoute, fetchBlocks, transactionsRoute, fetchTransactions };

