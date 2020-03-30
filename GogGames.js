import fetch from "node-fetch";
import {ErrorHandler} from "./error";

export class GogGames {

  async getGamesList(limit) {
    try {
      let url = 'https://embed.gog.com/games/ajax/filtered?mediaType=game&limit=20';
      if (limit) url = `https://embed.gog.com/games/ajax/filtered?mediaType=game&limit=${limit}`;
      const req = await fetch(url);
      return await req.json();
    } catch (e) {
      throw new ErrorHandler(e.statusCode, e.statusText);
    }
  }
}