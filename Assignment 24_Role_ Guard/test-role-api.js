const baseURL = 'http://localhost:5000/api';

async function runTests() {
  try {
    console.log('1. Registering User with "user" role...');
    const userRes = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: `testuser${Date.now()}`,
        email: `user${Date.now()}@example.com`,
        password: 'password123',
        role: 'user'
      })
    });
    const userData = await userRes.json();
    if (!userRes.ok) throw new Error(userData.message || 'Failed to register user');
    const userToken = userData.token;
    console.log('User registered successfully.');

    console.log('\n2. Registering User with "admin" role...');
    const adminRes = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: `testadmin${Date.now()}`,
        email: `admin${Date.now()}@example.com`,
        password: 'password123',
        role: 'admin'
      })
    });
    const adminData = await adminRes.json();
    if (!adminRes.ok) throw new Error(adminData.message || 'Failed to register admin');
    const adminToken = adminData.token;
    console.log('Admin registered successfully.');

    console.log('\n3. Testing User Dashboard with "user" token...');
    const userDash1 = await fetch(`${baseURL}/dashboard/user`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const userDash1Data = await userDash1.json();
    console.log('Response:', userDash1Data.message);

    console.log('\n4. Testing Admin Dashboard with "user" token... (Should fail)');
    const userDash2 = await fetch(`${baseURL}/dashboard/admin`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const userDash2Data = await userDash2.json();
    if (!userDash2.ok) {
      console.log('Expected Error:', userDash2Data.message);
    } else {
      console.log('Unexpected success:', userDash2Data.message);
    }

    console.log('\n5. Testing User Dashboard with "admin" token...');
    const adminDash1 = await fetch(`${baseURL}/dashboard/user`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminDash1Data = await adminDash1.json();
    console.log('Response:', adminDash1Data.message);

    console.log('\n6. Testing Admin Dashboard with "admin" token...');
    const adminDash2 = await fetch(`${baseURL}/dashboard/admin`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminDash2Data = await adminDash2.json();
    console.log('Response:', adminDash2Data.message);

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

runTests();
