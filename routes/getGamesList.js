import {Router} from "express";

import {api} from '../GogGames';

const router = Router();

router.get('/', async (req, res) => {
  const url = new URLSearchParams(req.query);
  const data = await api.getGamesList(url.get('page'), url.get('limit'));
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
  res.send([...filteredData, data.totalPages]);
});

module.exports = router;
