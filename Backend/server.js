

// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const nodemailer = require('nodemailer');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Database connection
// const db = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME || 'sebi_website',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('❌ Database connection failed:', err);
//     } else {
//         console.log('✅ Connected to MySQL database');
//         connection.release(); // release the test connection
//     }
// });

// // File upload configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // Email configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER, // Your email
//         pass: process.env.EMAIL_PASS  // Your email password or app password
//     }
// });

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
    
//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }
    
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// };

// // ===== AUTH ROUTES =====

// // Login
// app.post('/api/auth/login', (req, res) => {
//     const { email, password } = req.body;
    
//     console.log('Login attempt for:', email);
    
//     db.query('SELECT * FROM admin_users WHERE email = ?', [email], async (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ message: 'Server error' });
//         }
        
//         if (results.length === 0) {
//             console.log('User not found:', email);
//             return res.status(401).json({ message: 'Invalid credentials - User not found' });
//         }
        
//         const user = results[0];
//         console.log('User found, checking password...');
        
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         console.log('Password valid:', isPasswordValid);
        
//         if (!isPasswordValid) {
//             console.log('Invalid password for:', email);
//             return res.status(401).json({ message: 'Invalid credentials - Wrong password' });
//         }
        
//         const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
//         console.log('Login successful for:', email);
//         res.json({ token, email: user.email });
//     });
// });

// // ===== SERVICES ROUTES =====

// // Get all services (public)
// app.get('/api/services', (req, res) => {
//     db.query('SELECT * FROM services ORDER BY created_at DESC', (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });

// // Get single service (public)
// app.get('/api/services/:id', (req, res) => {
//     db.query('SELECT * FROM services WHERE id = ?', [req.params.id], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Service not found' });
//         }
//         res.json(results[0]);
//     });
// });

// // Add service (protected)
// app.post('/api/services', verifyToken, (req, res) => {
//     const { title, description, about } = req.body;
    
//     db.query(
//         'INSERT INTO services (title, description, about) VALUES (?, ?, ?)',
//         [title, description, about],
//         (err, result) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Server error' });
//             }
//             res.json({ id: result.insertId, message: 'Service added successfully' });
//         }
//     );
// });

// // Update service (protected)
// app.put('/api/services/:id', verifyToken, (req, res) => {
//     const { title, description, about } = req.body;
    
//     db.query(
//         'UPDATE services SET title = ?, description = ?, about = ? WHERE id = ?',
//         [title, description, about, req.params.id],
//         (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Server error' });
//             }
//             res.json({ message: 'Service updated successfully' });
//         }
//     );
// });

// // Delete service (protected)
// app.delete('/api/services/:id', verifyToken, (req, res) => {
//     db.query('DELETE FROM services WHERE id = ?', [req.params.id], (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json({ message: 'Service deleted successfully' });
//     });
// });

// // ===== BLOGS ROUTES =====

// // Get all blogs (public)
// app.get('/api/blogs', (req, res) => {
//     db.query('SELECT * FROM blogs ORDER BY created_at DESC', (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });

// // Get single blog (public)
// app.get('/api/blogs/:id', (req, res) => {
//     db.query('SELECT * FROM blogs WHERE id = ?', [req.params.id], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Blog not found' });
//         }
//         res.json(results[0]);
//     });
// });

// // Add blog (protected)
// app.post('/api/blogs', verifyToken, upload.single('image'), (req, res) => {
//     const { title, author, description } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
//     db.query(
//         'INSERT INTO blogs (title, author, image_url, description) VALUES (?, ?, ?, ?)',
//         [title, author, imageUrl, description],
//         (err, result) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Server error' });
//             }
//             res.json({ id: result.insertId, message: 'Blog added successfully' });
//         }
//     );
// });

// // Update blog (protected)
// app.put('/api/blogs/:id', verifyToken, upload.single('image'), (req, res) => {
//     const { title, author, description } = req.body;
    
//     // If new image uploaded, use it; otherwise keep existing
//     if (req.file) {
//         const imageUrl = `/uploads/${req.file.filename}`;
//         db.query(
//             'UPDATE blogs SET title = ?, author = ?, image_url = ?, description = ? WHERE id = ?',
//             [title, author, imageUrl, description, req.params.id],
//             (err) => {
//                 if (err) {
//                     return res.status(500).json({ message: 'Server error' });
//                 }
//                 res.json({ message: 'Blog updated successfully' });
//             }
//         );
//     } else {
//         db.query(
//             'UPDATE blogs SET title = ?, author = ?, description = ? WHERE id = ?',
//             [title, author, description, req.params.id],
//             (err) => {
//                 if (err) {
//                     return res.status(500).json({ message: 'Server error' });
//                 }
//                 res.json({ message: 'Blog updated successfully' });
//             }
//         );
//     }
// });

// // Delete blog (protected)
// app.delete('/api/blogs/:id', verifyToken, (req, res) => {
//     db.query('DELETE FROM blogs WHERE id = ?', [req.params.id], (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json({ message: 'Blog deleted successfully' });
//     });
// });

// // ===== CONTACT ROUTE =====

// app.post('/api/contact', (req, res) => {
//     const { name, email, contact_number, message } = req.body;
    
//     // Save to database
//     db.query(
//         'INSERT INTO contact_submissions (name, email, contact_number, message) VALUES (?, ?, ?, ?)',
//         [name, email, contact_number, message],
//         (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Server error' });
//             }
            
//             // Send email to receiver
//             const receiverMailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: 'rsharma@rakusha.com', // Change this to receiver's email
//                 subject: 'New Contact Form Submission',
//                 html: `
//                     <h3>New Contact Form Submission</h3>
//                     <p><strong>Name:</strong> ${name}</p>
//                     <p><strong>Email:</strong> ${email}</p>
//                     <p><strong>Contact Number:</strong> ${contact_number}</p>
//                     <p><strong>Message:</strong> ${message}</p>
//                 `
//             };
            
//             // Send confirmation email to user
//             const userMailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: email,
//                 subject: 'Thank you for contacting us',
//                 html: `
//                     <h3>Thank you for reaching out!</h3>
//                     <p>Dear ${name},</p>
//                     <p>We have received your message and will get back to you shortly.</p>
//                     <p><strong>Your message:</strong></p>
//                     <p>${message}</p>
//                     <br>
//                     <p>Best regards,<br>SEBI Website Team</p>
//                 `
//             };
            
//             // Send both emails
//             transporter.sendMail(receiverMailOptions);
//             transporter.sendMail(userMailOptions);
            
//             res.json({ message: 'Message sent successfully!' });
//         }
//     );
// });

// // ===== NEWSLETTER ROUTES =====

// // Subscribe to newsletter
// app.post('/api/newsletter/subscribe', (req, res) => {
//     const { email, name } = req.body;
    
//     // Check if email already exists
//     db.query('SELECT * FROM newsletter_subscribers WHERE email = ?', [email], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
        
//         if (results.length > 0) {
//             return res.status(400).json({ message: 'This email is already subscribed to our newsletter' });
//         }
        
//         // Insert new subscriber
//         db.query(
//             'INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)',
//             [email, name || ''],
//             (err) => {
//                 if (err) {
//                     return res.status(500).json({ message: 'Server error' });
//                 }
                
//                 // Send welcome email
//                 const mailOptions = {
//                     from: process.env.EMAIL_USER,
//                     to: email,
//                     subject: 'Welcome to Our Newsletter! 🎉',
//                     html: `
//                         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
//                             <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 10px 10px 0 0; text-align: center;">
//                                 <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to SEBI Website Newsletter!</h1>
//                             </div>
//                             <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
//                                 <p style="font-size: 16px; color: #333;">Dear ${name || 'Subscriber'},</p>
//                                 <p style="font-size: 16px; color: #333; line-height: 1.8;">
//                                     Thank you for subscribing to our newsletter! We're excited to have you join our community of informed investors and financial enthusiasts.
//                                 </p>
//                                 <div style="background: #f0f4ff; padding: 25px; border-radius: 8px; margin: 25px 0;">
//                                     <h3 style="color: #667eea; margin-top: 0;">You'll now receive:</h3>
//                                     <ul style="color: #555; line-height: 2;">
//                                         <li>📊 Latest financial insights and market analysis</li>
//                                         <li>💡 Expert investment tips and strategies</li>
//                                         <li>📈 Market trends and opportunities</li>
//                                         <li>📚 Educational content and guides</li>
//                                         <li>🎯 Exclusive updates and offers</li>
//                                     </ul>
//                                 </div>
//                                 <p style="font-size: 16px; color: #333; line-height: 1.8;">
//                                     Stay tuned for valuable information to help you make informed financial decisions and achieve your investment goals.
//                                 </p>
//                                 <div style="text-align: center; margin: 30px 0;">
//                                     <a href="http://localhost:3000" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">Visit Our Website</a>
//                                 </div>
//                                 <p style="font-size: 14px; color: #666; margin-top: 30px;">
//                                     Best regards,<br>
//                                     <strong style="color: #667eea;">SEBI Website Team</strong>
//                                 </p>
//                                 <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
//                                 <p style="font-size: 12px; color: #999; text-align: center;">
//                                     You're receiving this email because you subscribed to our newsletter.<br>
//                                     If you wish to unsubscribe, please contact us at info@sebiwebsite.com
//                                 </p>
//                             </div>
//                         </div>
//                     `
//                 };
                
//                 transporter.sendMail(mailOptions, (mailErr) => {
//                     if (mailErr) {
//                         console.error('Error sending email:', mailErr);
//                     }
//                 });
                
//                 res.json({ message: 'Successfully subscribed to newsletter! Please check your email.' });
//             }
//         );
//     });
// });

// // Get all subscribers (protected - admin only)
// app.get('/api/newsletter/subscribers', verifyToken, (req, res) => {
//     db.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC', (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json(results);
//     });
// });

// // Unsubscribe from newsletter
// app.post('/api/newsletter/unsubscribe', (req, res) => {
//     const { email } = req.body;
    
//     db.query('UPDATE newsletter_subscribers SET is_active = FALSE WHERE email = ?', [email], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
        
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Email not found' });
//         }
        
//         res.json({ message: 'Successfully unsubscribed from newsletter' });
//     });
// });

// // Delete subscriber (admin only)
// app.delete('/api/newsletter/subscribers/:id', verifyToken, (req, res) => {
//     db.query('DELETE FROM newsletter_subscribers WHERE id = ?', [req.params.id], (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Server error' });
//         }
//         res.json({ message: 'Subscriber deleted successfully' });
//     });
// });

// // ====== Serve Frontend Build ======


// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
// });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static('uploads'));

// Database connection with SSL for Hostinger
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
    ssl: process.env.DB_HOST !== 'localhost' ? { rejectUnauthorized: false } : false
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL database');
        connection.release();
    }
});

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
};

// ===== AUTH ROUTES =====

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email);
    
    db.query('SELECT * FROM admin_users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        
        if (results.length === 0) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const user = results[0];
        console.log('User found, checking password...');
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
            console.log('Invalid password for:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        
        console.log('Login successful for:', email);
        res.json({ token, email: user.email });
    });
});

// ===== SERVICES ROUTES =====

app.get('/api/services', (req, res) => {
    db.query('SELECT * FROM services ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
});

app.get('/api/services/:id', (req, res) => {
    db.query('SELECT * FROM services WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(results[0]);
    });
});

app.post('/api/services', verifyToken, (req, res) => {
    const { title, description, about } = req.body;
    
    db.query(
        'INSERT INTO services (title, description, about) VALUES (?, ?, ?)',
        [title, description, about],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ id: result.insertId, message: 'Service added successfully' });
        }
    );
});

app.put('/api/services/:id', verifyToken, (req, res) => {
    const { title, description, about } = req.body;
    
    db.query(
        'UPDATE services SET title = ?, description = ?, about = ? WHERE id = ?',
        [title, description, about, req.params.id],
        (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'Service updated successfully' });
        }
    );
});

app.delete('/api/services/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM services WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Service deleted successfully' });
    });
});

// ===== BLOGS ROUTES =====

app.get('/api/blogs', (req, res) => {
    db.query('SELECT * FROM blogs ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
});

app.get('/api/blogs/:id', (req, res) => {
    db.query('SELECT * FROM blogs WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(results[0]);
    });
});

app.post('/api/blogs', verifyToken, upload.single('image'), (req, res) => {
    const { title, author, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    db.query(
        'INSERT INTO blogs (title, author, image_url, description) VALUES (?, ?, ?, ?)',
        [title, author, imageUrl, description],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ id: result.insertId, message: 'Blog added successfully' });
        }
    );
});

app.put('/api/blogs/:id', verifyToken, upload.single('image'), (req, res) => {
    const { title, author, description } = req.body;
    
    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        db.query(
            'UPDATE blogs SET title = ?, author = ?, image_url = ?, description = ? WHERE id = ?',
            [title, author, imageUrl, description, req.params.id],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.json({ message: 'Blog updated successfully' });
            }
        );
    } else {
        db.query(
            'UPDATE blogs SET title = ?, author = ?, description = ? WHERE id = ?',
            [title, author, description, req.params.id],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                res.json({ message: 'Blog updated successfully' });
            }
        );
    }
});

app.delete('/api/blogs/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM blogs WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Blog deleted successfully' });
    });
});

// ===== CONTACT ROUTE =====

app.post('/api/contact', (req, res) => {
    const { name, email, contact_number, message } = req.body;
    
    db.query(
        'INSERT INTO contact_submissions (name, email, contact_number, message) VALUES (?, ?, ?, ?)',
        [name, email, contact_number, message],
        (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            
            const receiverMailOptions = {
                from: process.env.EMAIL_USER,
                to: 'rsharma@rakusha.com',
                subject: 'New Contact Form Submission',
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Contact Number:</strong> ${contact_number}</p>
                    <p><strong>Message:</strong> ${message}</p>
                `
            };
            
            const userMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Thank you for contacting us',
                html: `
                    <h3>Thank you for reaching out!</h3>
                    <p>Dear ${name},</p>
                    <p>We have received your message and will get back to you shortly.</p>
                    <p><strong>Your message:</strong></p>
                    <p>${message}</p>
                    <br>
                    <p>Best regards,<br>SEBI Website Team</p>
                `
            };
            
            transporter.sendMail(receiverMailOptions);
            transporter.sendMail(userMailOptions);
            
            res.json({ message: 'Message sent successfully!' });
        }
    );
});

// ===== NEWSLETTER ROUTES =====

app.post('/api/newsletter/subscribe', (req, res) => {
    const { email, name } = req.body;
    
    db.query('SELECT * FROM newsletter_subscribers WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ message: 'This email is already subscribed to our newsletter' });
        }
        
        db.query(
            'INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)',
            [email, name || ''],
            (err) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Welcome to Our Newsletter! 🎉',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 10px 10px 0 0; text-align: center;">
                                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to SEBI Website Newsletter!</h1>
                            </div>
                            <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px;">
                                <p style="font-size: 16px; color: #333;">Dear ${name || 'Subscriber'},</p>
                                <p style="font-size: 16px; color: #333; line-height: 1.8;">
                                    Thank you for subscribing to our newsletter! We're excited to have you join our community.
                                </p>
                                <div style="background: #f0f4ff; padding: 25px; border-radius: 8px; margin: 25px 0;">
                                    <h3 style="color: #667eea; margin-top: 0;">You'll now receive:</h3>
                                    <ul style="color: #555; line-height: 2;">
                                        <li>📊 Latest financial insights</li>
                                        <li>💡 Expert investment tips</li>
                                        <li>📈 Market trends</li>
                                        <li>📚 Educational content</li>
                                    </ul>
                                </div>
                                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                                    Best regards,<br>
                                    <strong style="color: #667eea;">SEBI Website Team</strong>
                                </p>
                            </div>
                        </div>
                    `
                };
                
                transporter.sendMail(mailOptions, (mailErr) => {
                    if (mailErr) {
                        console.error('Error sending email:', mailErr);
                    }
                });
                
                res.json({ message: 'Successfully subscribed to newsletter! Please check your email.' });
            }
        );
    });
});

app.get('/api/newsletter/subscribers', verifyToken, (req, res) => {
    db.query('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
});

app.post('/api/newsletter/unsubscribe', (req, res) => {
    const { email } = req.body;
    
    db.query('UPDATE newsletter_subscribers SET is_active = FALSE WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Email not found' });
        }
        
        res.json({ message: 'Successfully unsubscribed from newsletter' });
    });
});

app.delete('/api/newsletter/subscribers/:id', verifyToken, (req, res) => {
    db.query('DELETE FROM newsletter_subscribers WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Subscriber deleted successfully' });
    });
});

// Health check routes
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok',
        message: 'SEBI Website Backend API is running!',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
