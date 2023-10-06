const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/articles', async (req, res) => {
  try {
    const response = await fetch('https://zenn.dev/api/articles?username=gaimo_ch&order=latest');

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(500).json({ error: '無効なJSONデータが返されました' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'エラーが発生しました' });
  }
});

app.listen(port, () => {
  console.log(`ポート${port}で実行中...`);
});
