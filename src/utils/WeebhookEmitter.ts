import axios from 'axios';
import webhooksdb from '../webhooks.json'
import { IMatch } from 'srcinterfaces/match.interface';
import { ClubMemberAchievement } from 'srctypes/clubMemberAchievement.type';


export const emitNewMatch = async (match:IMatch) =>{
    const urls:string[] = webhooksdb.newmatch;

    const data = {
      match: match
    };
    
    for(var url in urls){
      await axios.post(urls[url], data)
      .then(response => {
        console.info("[Webhook emitter] New match webhook event emitted to "+urls[url])
      })
      .catch(error => {
        console.error("[Webhook emitter] Error sending webhook to "+urls[url]);
      });
    }
}

export const emitMemberAchievement = async (ach:ClubMemberAchievement) =>{
  const urls:string[] = webhooksdb.memberachievement;

  const data = {
    achievement: ach
  };
  
  for(var url in urls){
    await axios.post(urls[url], data)
    .then(response => {
      console.info("[Webhook emitter] Member achievement webhook event emitted to "+urls[url])
    })
    .catch(error => {
      console.error("[Webhook emitter] Error sending webhook to "+urls[url]);
    });
  }
}