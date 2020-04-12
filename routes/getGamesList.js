import {Router} from "express";

import {GogGames} from '../GogGames';

const router = Router();

router.get('/', async (req, res) => {
  const api = new GogGames();
  const games = await api.getGamesList();
  const filteredData = games.products.map(el => {
    return {
      id: el.id,
      title: el.title,
      category: el.category,
      worksOnWindows: el.worksOn.Windows,
      worksOnMac: el.worksOn.Mac,
      worksOnLinux: el.worksOn.Linux,
      price: el.price.finalAmount,
    }
  });
  res.send(filteredData);
});

module.exports = router;
