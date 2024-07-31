import axios from 'axios';
import webhooksdb from '../../webhooks.json'
import { IMatch } from 'srcinterfaces/match.interface';


export const emitNewMatch = async (match:IMatch) =>{
    const urls:string[] = webhooksdb.newmatch;

    const data = {
      match: match
    };
    
    for(var url in urls){
      axios.post(urls[url], data)
      .then(response => {
        console.info("[Webhook emitter] New match webhook event emitted")
      })
      .catch(error => {
        console.error(error);
      });
    }
}