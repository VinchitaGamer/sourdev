import fetch from 'node-fetch';

async function testAPI() {
    const BASE_URL = 'http://localhost:4000/api';

    console.log('Testing API...');

    // 1. Test Health
    try {
        const res = await fetch(`${BASE_URL}/health`);
        const data = await res.json();
        console.log('Health Check:', data);
    } catch (e) { console.error('Health Check Failed', e.message); }

    // 2. Test Login
    let token = '';
    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });
        const data = await res.json();
        if (res.ok) {
            console.log('Login Success:', data.username);
            token = data.token;
        } else {
            console.error('Login Failed:', data);
        }
    } catch (e) { console.error('Login Error', e.message); }

    // 3. Test Content Fetch
    try {
        const res = await fetch(`${BASE_URL}/content/hero`);
        const data = await res.json();
        console.log('Hero Content:', data.title ? 'Found' : 'Empty');
    } catch (e) { console.error('Content Fetch Error', e.message); }

}

testAPI();
