import express = require('express');

const app = express();
const PORT = '3000';
process.env.PORT = PORT;

app.use(express.static(`${__dirname}/dist`));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
