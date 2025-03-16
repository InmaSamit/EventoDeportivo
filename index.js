const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./src/api/routes/api.routes');

const server = express();
server.use(express.json());
server.use(cors());
server.use('/', router);

const PORT = 4500;
server.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
