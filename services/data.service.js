
//let resData = await fetch('/./data/photo.json')
import { VAR_DATA } from "https://aandresgarza.github.io/desarrollo/environments.js";

//GET All data
export async function getRequestData()  {
    let resData = await fetch(VAR_DATA)
                        .then( res => res.json() )
                        .then( async (result) => {return result} ,
                                      (error) => {return error });
    return resData;
}

export default {getRequestData}