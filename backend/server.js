const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'localhost',
  user: 'root',
  password: '4100',
  database: 'project'
});
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in the mock database
  const sql='SELECT password from user_data WHERE email=?'
  pool.query(sql,[email],(err,result)=>{
    if (err) {
      console.error('Error fetching user data from MySQL:', err);
      res.status(500).json({ error: 'Error fetching user data from MySQL' });
      return;
    }

      res.status(200).json(password);
    

});
});

// Route to handle form submission
app.post('/submit-form1', (req, res) => {
  const { email, password } = req.body;

  // Insert data into MySQL database
  const sql = 'INSERT INTO user_data (email, password) VALUES (?, ?)';
  pool.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err);
      res.status(500).json({ error: 'Error inserting data into MySQL' });
      return;
    }
    console.log('Data inserted into MySQL successfully');
    res.status(200).json({ message: 'Data inserted into MySQL successfully' });
  });
});
app.post('/submit-form', (req, res) => { 
  console.log(req.body);
  const { email, name, age, mobileNumber, bmi, temperature, painLevel, feedback } = req.body;
  console.log(email)
  
  const sql = ` UPDATE user_data SET name=?, age=?, mobile_number=?, bmi=?, temperature_range=?, pain_intensity_level=?, feedback=? WHERE email='${email}'`;
  console.log(sql)
  pool.query(sql, [ name, age, mobileNumber, bmi, temperature, painLevel, feedback], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL: ' + err);
      res.status(500).json({ error: 'Error inserting data into MySQL' });
      return;
    }
    console.log('Data inserted into MySQL successfully');
    res.status(200).json({ message: 'Data inserted into MySQL successfully' });
  });
});

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const connection = await pool.getConnection(); // Acquire a connection from the pool
//     const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]); // Use execute instead of query
//     connection.release(); // Release the connection back to the pool

//     if (rows.length === 0 || rows[0].password !== password) {
//       res.status(401).json({ message: 'Invalid email or password' });
//     } else {
//       res.status(200).json({ message: 'Login successful', user: rows[0] });
//     }
//   } catch (error) {
//     console.error('Error querying database:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


app.get('/user-data', (req, res) => {
    // Query the database to fetch user data
    const sql = 'SELECT * FROM user_data';
    pool.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching user data from MySQL:', err);
        res.status(500).json({ error: 'Error fetching user data from MySQL' });
        return;
      }
      res.status(200).json(result);
    });
  });
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
