// 1. Import dependencies at the top
const express = require('express');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); // Import CORS

// 2. Initialize your Express app
const app = express();

// 3. Configure middleware (like CORS) AFTER creating the app
app.use(cors({
  origin: 'https://elite-real-estate-bay.vercel.app' // Your Vercel frontend URL
}));

app.use(express.static('public')); // Serve static files

// 4. Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 5. Define the port
const PORT = process.env.PORT || 3000;

// 6. Define your API route
app.get('/api/properties', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 7. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});