const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const verifySupabaseToken = require("../middlewares/adminAuth");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return res.status(401).json({ error: 'Invalid credentials' });
    // No admin role check: all users are treated as admin
    res.json({
      message: 'Admin login successful',
      userEmail: data.user.email,
      access_token: data.session.access_token
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Example protected route
router.get('/me', verifySupabaseToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
