// Server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// MySQL Connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registration'
});


app.use(bodyParser.json());
app.use(cors());


const queryDatabase = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


app.get('/user_details', (req, res) => {
  pool.query('SELECT * FROM user_details', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/Login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    // Execute the login query to retrieve user details including username and user_role
    const loginResults = await queryDatabase('SELECT username, user_role FROM user_details WHERE username = ? AND password = ?', [username, password]);
    console.log('Login results:', loginResults); // Debugging statement
    if (loginResults.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const { user_role } = loginResults[0];
    console.log('Username:', username); // Debugging statement
    console.log('User role:', user_role); // Debugging statement
    // Execute the menu items query
    const menuItemsResults = await queryDatabase('SELECT parent_component_id, child_component_id FROM role_component_mapping WHERE user_role = ?', [user_role]);
    const parentComponentIDs = menuItemsResults.map(row => row.parent_component_id);
    const childComponentIDs = menuItemsResults.map(row => row.child_component_id);
    let menuItems = [];
    if (parentComponentIDs.length > 0) {
      const parentResults = await queryDatabase('SELECT * FROM parent_components WHERE id IN (?)', [parentComponentIDs]);
      const childResults = await queryDatabase('SELECT * FROM child_components WHERE id IN (?)', [childComponentIDs]);
      menuItems = parentResults.map(parent => ({
        id: parent.id,
        type: 'group',
        title: parent.title,
        icon: parent.icon,
        url: parent.url,
        children: childResults
          .filter(child => child.parent_component_id === parent.id)
          .map(child => ({
            id: child.id,
            type: 'item',
            title: child.title,
            icon: child.icon,
            url: child.url
          }))
      }));
    }
    // Add line separator after regular menu items
    menuItems.push({
      id: 'separator',
      type: 'separator'
    });
    // Retrieve favorite components from favorites_add table with username and password condition
    const favoritesResults = await queryDatabase('SELECT fa.id, ct.title, fa.url, ct.icon FROM favorites_add fa INNER JOIN child_components ct ON fa.url = ct.url WHERE fa.username = ? AND fa.password = ?', [username, password]);
    // Append favorite components as a single group item in menuItems
    if (favoritesResults.length > 0) {
      menuItems.push({
        id: 'favorites',
        type: 'group',
        title: 'Favorites',
        icon: 'feather icon-star', // Add icon if needed
        url: '/favorites', // Add URL if needed
        children: favoritesResults.map(child => ({
          id: child.id,
          type: 'item',
          title: child.title,
          icon: child.icon,
          url: child.url
        }))
      });
    }

    const recentlyVisitedResults = await queryDatabase('SELECT rv.id, ct.title, rv.url, ct.icon FROM recently_visited rv INNER JOIN child_components ct ON rv.url = ct.url WHERE rv.username = ?', [username]);
  
    // Append recently visited components as a single group item in menuItems
    if (recentlyVisitedResults.length > 0) {
      menuItems.push({
        id: 'recently_visited',
        type: 'group',
        title: 'Recently Visited',
        icon: 'feather icon-clock', // Icon for recently visited items
        url: '/recently_visited', 
        children: recentlyVisitedResults.map(child => ({
          id: child.id,
          type: 'item',
          title: child.title,
          icon: child.icon,
          url: child.url
        }))
      });
    }
    console.log('Constructed menu items:', menuItems);
    // Send response with menu items and user details
    res.json({ 
      username: username, 
      user_role: user_role, 
      items: menuItems 
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/resetpassword', async (req, res) => {
  const { email, newPassword } = req.body;

  // Step 1: Validate the required fields
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  try {
    // Step 2: Check if email exists in the user_details table
    const userResults = await queryDatabase('SELECT email FROM user_details WHERE email = ?', [email]);

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Step 3: Update the password directly in the database without hashing
    await queryDatabase('UPDATE user_details SET password = ? WHERE email = ?', [newPassword, email]);

    // Step 4: Send success response
    res.json({
      message: 'Password successfully reset'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/resetpassword_details', async (req, res) => {
  const { username, newPassword } = req.body;

  // Step 1: Validate the required fields
  if (!username || !newPassword) {
    return res.status(400).json({ error: 'Username and new password are required' });
  }

  try {
    // Step 2: Check if username exists in the user_details table
    const userResults = await queryDatabase('SELECT username FROM user_details WHERE username = ?', [username]);

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Username not found' });
    }

    // Step 3: Update the password directly in the database
    await queryDatabase('UPDATE user_details SET password = ? WHERE username = ?', [newPassword, username]);

    // Step 4: Send success response
    res.json({
      message: 'Password successfully reset'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/changepassword_details', async (req, res) => {
  const { username, newPassword } = req.body;

  // Step 1: Validate the required fields
  if (!username || !newPassword) {
    return res.status(400).json({ error: 'Username and new password are required' });
  }

  try {
    // Step 2: Check if username exists in the user_details table
    const userResults = await queryDatabase('SELECT username FROM user_details WHERE username = ?', [username]);

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Username not found' });
    }

    // Step 3: Update the password directly in the database
    await queryDatabase('UPDATE user_details SET password = ? WHERE username = ?', [newPassword, username]);

    // Step 4: Send success response
    res.json({
      message: 'Password successfully reset'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/modifyUserDetails', async (req, res) => {
  const { email, newRole } = req.body;

  // Validate the inputs
  if (!email || !newRole) {
    return res.status(400).json({ error: 'Email and new role are required' });
  }

  try {
    // Update the user's role in the database
    const updateResult = await queryDatabase('UPDATE user_details SET user_role = ? WHERE email = ?', [newRole, email]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return a success response
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getAllUserRoles', async (req, res) => {
  try {
    // Step 1: Query the user_details table to get all user details (including roles)
    const results = await queryDatabase('SELECT *  FROM user_details');

    // Step 2: Return all user details including their role
    if (results.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/recentlyvisited', async (req, res) => {
  const { username, password, url, title } = req.body;

  
  console.log('Request body:', req.body);

  try {
   
    const existingRecord = await queryDatabase('SELECT * FROM recently_visited WHERE username = ? AND password = ? AND url = ?', [username, password, url]);

    
    const recordCount = await queryDatabase('SELECT COUNT(*) AS count FROM recently_visited WHERE username = ? AND password = ?', [username, password]);

    if (existingRecord.length > 0) {
    
      await queryDatabase('UPDATE recently_visited SET title = ?, created = NOW() WHERE username = ? AND password = ? AND url = ?', [title, username, password, url]);
      res.json({ success: true, message: 'Recently visited record updated successfully' });
    } else if (recordCount[0].count < 10) {
    
      await queryDatabase('INSERT INTO recently_visited (username, password, url, title, created) VALUES (?, ?, ?, ?, NOW())', [username, password, url, title]);
      res.json({ success: true, message: 'Recently visited record added successfully' });
    } else {
     
      await queryDatabase('DELETE FROM recently_visited WHERE username = ? AND password = ? AND created = (SELECT MIN(created) FROM recently_visited WHERE username = ? AND password = ?)', [username, password, username, password]);
    
      await queryDatabase('INSERT INTO recently_visited (username, password, url, title, created) VALUES (?, ?, ?, ?, NOW())', [username, password, url, title]);
      res.json({ success: true, message: 'Recently visited record added successfully' });
    }
  } catch (error) {
    
    console.error('Error adding or updating recently visited record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/ProcessDetails', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    
    const processDetailsResults = await queryDatabase('SELECT business_units, url FROM process_dtls WHERE username = ? AND pass = ?', [username, password]);
    console.log('Process details results:', processDetailsResults);
    if (processDetailsResults.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
  
    const processDetails = processDetailsResults.map(row => ({
      business_units: row.business_units,
      url: row.url
    }));
    
    
    const recentlyVisitedResults = await queryDatabase('SELECT rv.url, cc.title FROM recently_visited rv INNER JOIN child_components cc ON rv.url = cc.url WHERE rv.username = ? AND rv.password = ?', [username, password]);
    console.log('Recently visited URLs:', recentlyVisitedResults); 


    const recentlyVisitedURLs = recentlyVisitedResults.map(row =>  ({
      recently_visited: row.title,
      url: row.url
    }));
    

    const favoritesResults = await queryDatabase('SELECT iv.url, lc.title FROM favorites_add iv INNER JOIN child_components lc ON iv.url = lc.url WHERE iv.username = ? AND iv.password = ?', [username, password]);
    console.log('Recently visited URLs:', favoritesResults); 


    const favoritesURLs = favoritesResults.map(row =>  ({
      favorites: row.title,
      url: row.url
    }));

    res.json({ 
      process_details: processDetails,
      recently_visited: recentlyVisitedURLs,
      favorites:favoritesURLs
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.post('/addToFavorites', async (req, res) => {
  const { username, password, url, title } = req.body;


  console.log('Request body:', req.body);

  if (!username || !password || !url || !title) {
    return res.status(400).json({ error: 'Username, password, URL, and title are required' });
  }

  try {
   
    const existingFavorite = await queryDatabase('SELECT id FROM favorites_add WHERE username = ? AND password = ? AND url = ? AND title = ?', [username, password, url, title]);

    if (existingFavorite.length > 0) {
     
      await queryDatabase('DELETE FROM favorites_add WHERE username = ? AND password = ? AND url = ? AND title = ?', [username, password, url, title]);
      res.json({ success: true, message: 'Favorite removed successfully' });
    } else {
      
      await queryDatabase('INSERT INTO favorites_add (username, password, url, title, created_at) VALUES (?, ?, ?, ?, NOW())', [username, password, url, title]);
      res.json({ success: true, message: 'Favorite added successfully' });
    }
  } catch (error) {
   
    console.error('Error adding or removing favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});











app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
