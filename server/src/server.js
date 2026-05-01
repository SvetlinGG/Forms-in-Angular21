import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'


const app = express();

const PORT = 5050;

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    console.log('REQ:', req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    res.send('ROOT OK');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API works'})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    
})