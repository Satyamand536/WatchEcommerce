const axios = require('axios');

async function testConnection() {
  try {
    const response = await axios.get('http://localhost:5000/api/payment/test');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
    }
  }
}

testConnection();
