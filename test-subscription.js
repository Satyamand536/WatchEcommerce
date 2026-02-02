// Test script for subscription API
const testSubscription = async () => {
  try {
    console.log('🧪 Testing subscription API...\n');
    
    const testEmail = 'test' + Date.now() + '@example.com';
    console.log(`Testing with email: ${testEmail}\n`);
    
    const response = await fetch('http://localhost:5000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: testEmail })
    });
    
    const data = await response.json();
    
    console.log('✅ Response Status:', response.status);
    console.log('📦 Response Data:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.success) {
      console.log('\n✅ SUCCESS! Subscription worked!');
      console.log('📧 Check the inbox for:', testEmail);
    } else {
      console.log('\n❌ FAILED! Response:', data);
    }
    
  } catch (error) {
    console.log('\n❌ ERROR:', error.message);
  }
};

testSubscription();
