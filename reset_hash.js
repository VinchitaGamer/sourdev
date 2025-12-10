import bcrypt from 'bcryptjs';

const password = 'admin123';
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, 10);

console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);

// Verify immediately
const match = await bcrypt.compare(password, hash);
console.log(`Match check: ${match}`);
