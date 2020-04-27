import fetch from "node-fetch";
import {ErrorHandler} from "./error";

class GogGames {

  async getGamesList(page, limit) {
    try {
      const url = `https://embed.gog.com/games/ajax/filtered?mediaType=game&page=${page}&limit=${limit}`;
      const req = await fetch(url);
      return await req.json();
    } catch (e) {
      throw new ErrorHandler(e.statusCode, e.statusText);
    }
  }
}

export const api = new GogGames();