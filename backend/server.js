const express = require('express');
const app = express();
const cors = require('cors');
const dotenv=require('dotenv');
const todoRoutes=require('./routes/todo_route')


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT||8080 ;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/',todoRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});