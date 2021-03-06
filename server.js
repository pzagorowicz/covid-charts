const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const csv = require('csv-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/provinces', (req, res) => {
  const results = [];

  fs.createReadStream('./data/covid_19_data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const provinces = results.map(item => item['Province/State']);
      const uniqueProvices = [...new Set(provinces)]
        .map((value, index) => ({ id: index, content: value }));

      res.send({ provinces: uniqueProvices });
    });
});

app.get('/api/dataByProvince', (req, res) => {
  const selectedProvince = req.query.province;
  const results = [];

  fs.createReadStream('./data/covid_19_data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const data = results
        .filter(item => item['Province/State'] === selectedProvince)
        .map(item => ({ observationDate: item['ObservationDate'], confirmed: item['Confirmed'], deaths: item['Deaths'], recovered: item['Recovered'] }));

      res.send({ data });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));