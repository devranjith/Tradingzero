import express from 'express';

const router = express.Router();

// Note: In a real Supabase setup, most auth happens on the client via the Supabase JS library.
// We can use these routes if we need backend-specific auth logic or to sync users.

router.post('/sync-user', async (req, res) => {
  // Sync user from frontend Supabase auth into our database if needed
  res.json({ message: 'User sync not fully implemented here. Use Supabase client.' });
});

export default router;
