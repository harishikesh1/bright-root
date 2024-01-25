// login.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const secretKey = '2e8ed2ffaf2b8219d73d767bcea2bde2e0fd00ed2b3f1ce9ae2fdefa97c63fcc'; // Replace with a secure secret key

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists and validate the password
  const sql = 'SELECT * FROM signup WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.length === 1) {
        const user = result[0];

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Generate a JWT token
          const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
