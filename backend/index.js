const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./controllers/User');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(express.json()); 
app.use(cors(
    {origin: 'http://localhost:5173', credentials: true}
));

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.use('/api', userRoutes);
const PORT = 5000;

app.get('/',(req,res)=>{
    res.send('Hello from backend');
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});