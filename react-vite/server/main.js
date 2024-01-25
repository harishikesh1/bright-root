import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'erp',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle user registration and issue JWT token
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the MySQL database with hashed password
    const sql = 'INSERT INTO signup (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('MySQL insertion error:', err);
        res.status(500).send('Error inserting data into the database');
      } else {
        console.log('User registered successfully');

        // Create and sign a JWT token
        const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ message: 'User registered successfully', token });
      }
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

const secretKey = '2e8ed2ffaf2b8219d73d767bcea2bde2e0fd00ed2b3f1ce9ae2fdefa97c63fcc'; // Replace with a secure secret key

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
 
  console.log('Received login request with email:', email);
  console.log('Received login request with password:', password);
  // Query the database to check if the user exists and validate the password
  const sql = 'SELECT * FROM signup WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.length === 1) {
        const user = result[0];
// console.log(user.password);
        // Compare the hashed password
        console.log('  Stored hashed password:', user.password);
        console.log('Received password:', password);
    const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Received hashed password:', hashedPassword);
        
        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        console.log(passwordMatch);


        if (passwordMatch) {
          // Generate a JWT token
          const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
console.log("thie si s",token);
          res.status(200).json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
