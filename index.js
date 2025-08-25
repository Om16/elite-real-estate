// 1. Import the Express library and others
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const { createClient } = require('@supabase/supabase-js');

const cors = require('cors'); // <-- 1. Import the cors package

// 2. Enable CORS for all routes, allowing your Vercel frontend
app.use(cors({
  origin: 'https://elite-real-estate-bay.vercel.app' // Your Vercel URL here
}));

// Optional: Also allow requests from localhost for testing
// app.use(cors({
//   origin: ['https://elite-real-estate-bay.vercel.app', 'http://localhost:3000']
// }));

app.use(express.static('public'));
// ... rest of your code (Supabase setup, routes, etc.)

// 2. Create an instance of an Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// 3. Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 4. Define the port number our server will listen on
const PORT = process.env.PORT || 3000;

// 5. Define a route to get the list of properties from Supabase
app.get('/api/properties', async (req, res) => {
  try {
    // Fetch data from the 'properties' table in Supabase
    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      throw error;
    }

    // Send the fetched data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});