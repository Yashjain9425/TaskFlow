import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
// import 'dotenv/config'
import { connectDB } from './config/db.js';

import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import groupRouter from './routes/groupRoute.js';
import groupTaskRouter from './routes/groupTaskRoute.js';


const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   

// DB CONNECT
connectDB();

// ROUTES
app.use('/api/user', userRouter); 
app.use('/api/tasks', taskRouter);
app.use('/api/groups', groupRouter);
app.use('/api/group-tasks', groupTaskRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})