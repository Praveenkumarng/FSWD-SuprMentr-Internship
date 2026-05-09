const testFlow = async () => {
  try {
    const ts = Date.now();
    const email = `test_${ts}@example.com`;
    const username = `testuser_${ts}`;
    
    console.log('--- Testing Signup ---');
    const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password: 'password123'
      })
    });
    const signupData = await signupRes.json();
    console.log('Signup Status:', signupRes.status);
    console.log('Signup Response:', signupData);

    console.log('\n--- Testing Login ---');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login Status:', loginRes.status);
    console.log('Login Response:', loginData);
    
    console.log('\n--- Testing Protected Route ---');
    if(loginData.token) {
        const profileRes = await fetch('http://localhost:5000/api/auth/profile', {
            headers: { 'Authorization': `Bearer ${loginData.token}` }
        });
        const profileData = await profileRes.json();
        console.log('Profile Status:', profileRes.status);
        console.log('Profile Response:', profileData);
    }
  } catch (error) {
    console.error('Error during test:', error);
  }
};
testFlow();
