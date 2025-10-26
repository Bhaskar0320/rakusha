



const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupAdmin() {
    console.log('🔧 Setting up admin user...\n');
    
    // Read from .env file - NO HARDCODED CREDENTIALS
    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'sebi_website'
    };
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Validation
    if (!adminEmail || !adminPassword) {
        console.error('❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file');
        return;
    }
    
    if (!dbConfig.password) {
        console.error('❌ Error: DB_PASSWORD must be set in .env file');
        return;
    }
    
    try {
        console.log('📡 Connecting to database...');
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database\n');
        
        console.log('🗑️  Deleting existing admin users...');
        await connection.query('DELETE FROM admin_users');
        console.log('✅ Cleared admin_users table\n');
        
        console.log('🔐 Generating password hash...');
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        console.log('✅ Password hash generated\n');
        
        console.log('➕ Creating new admin user...');
        await connection.query(
            'INSERT INTO admin_users (email, password) VALUES (?, ?)',
            [adminEmail, hashedPassword]
        );
        console.log('✅ Admin user created!\n');
        
        console.log('=' .repeat(50));
        console.log('🎉 ADMIN SETUP COMPLETE!');
        console.log('=' .repeat(50));
        console.log('\n📧 Admin Email:', adminEmail);
        console.log('🔒 Password: [HIDDEN FOR SECURITY]');
        console.log('\n⚠️  Keep your .env file secure and DO NOT commit it to git!\n');
        
        await connection.end();
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('⚠️  MySQL is not running! Start MySQL first.');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('⚠️  Database does not exist! Create it first.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('⚠️  Wrong MySQL credentials in .env file!');
        }
    }
}

setupAdmin();