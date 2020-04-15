import {Router} from "express";

import {GogGames} from '../GogGames';

const router = Router();

router.get('/', async (req, res) => {
  const url = new URLSearchParams(req.query);
  const limit = url.get('limit');
  const page = url.get('page');
  const api = new GogGames();
  console.log(page)
  const data = await api.getGamesList(page, limit);
  const totalPages = data.totalPages;
  const filteredData = data.products.map(el => {
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
  res.send([...filteredData, totalPages]);
});

module.exports = router;
