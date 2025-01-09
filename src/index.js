import express from "express";
import cors from 'cors';
import clientRoutes from "./routes/clientRoute.js"
const app= express();
const PORT = 3001;

    app.use(cors());

const corsOptions = {
  origin: 'http://localhost:5173',  // Allow requests from your frontend
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors({ origin: '*' }));  // Allow requests from any origin


// Enable CORS for all routes
app.use(cors(corsOptions));




// Allow requests from frontend


app.use(express.json());
app.use('/api',clientRoutes);



app.listen(PORT,()=>{
    console.log('Server running on port 3001');
});
