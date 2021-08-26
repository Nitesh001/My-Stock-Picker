import axios, { CancelTokenSource } from "axios"
import { apiKEY } from "src/lib/config"

let cancelTokenSource:CancelTokenSource;

export const getAutocompleteSuggestions:({keyword:string})=>Promise<any> = ({keyword}) => {
  cancelTokenSource = axios.CancelToken.source();
  return axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKEY}`, {
    cancelToken: cancelTokenSource.token
  })
  // .then((resp)=>{
  //   return resp;
  // })
  // .catch((e)=>{
  //   console.log(e);
  // })
}

export const getStockDetails:({keyword:string})=>Promise<any> = ({keyword}) => {
  cancelTokenSource = axios.CancelToken.source();
  return Promise.all([
    axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${keyword}&apikey=${apiKEY}`,{
      cancelToken: cancelTokenSource.token
    }),
    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${keyword}&apikey=${apiKEY}`, {
      cancelToken: cancelTokenSource.token
    })
  ])
}

export const cancelCurrentRequest = () => {
  if(cancelTokenSource) {
    cancelTokenSource.cancel();
  }
}