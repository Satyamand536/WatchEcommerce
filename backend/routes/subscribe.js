const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber');

// Create Nodemailer transporter with automatic fallback
const createTransporter = async () => {
  const hasGmailCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

  if (hasGmailCredentials) {
    // Try Gmail SMTP first
    console.log('📧 Attempting to use Gmail SMTP...');
    const gmailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Test Gmail connection
    try {
      await gmailTransporter.verify();
      console.log('✅ Gmail SMTP connected successfully!');
      return gmailTransporter;
    } catch (error) {
      console.error('❌ Gmail authentication failed:', error.message);
      console.log('⚠️ Falling back to test email service...');
    }
  }

  // Fallback to Ethereal test email service
  console.log('📧 Using Ethereal test email service (emails won\'t actually send)');
  console.log('💡 To use real Gmail: Fix EMAIL_USER and EMAIL_PASS in .env');
  
  // Create test account
  const testAccount = await nodemailer.createTestAccount();
  
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
};

const { validateSubscribe } = require('../middleware/validationMiddleware');

// POST /api/subscribe - Subscribe to newsletter
router.post('/', validateSubscribe, async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Email format validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    
    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    // Save to database
    const subscriber = await Subscriber.create({
      email: email.toLowerCase()
    });

    // Send confirmation email
    try {
      const transporter = await createTransporter();

      const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@preseejan.com',
        to: email,
        subject: '✨ Welcome to the Inner Circle – Pre-See-Jan',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #000 0%, #333 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .logo {
                font-size: 28px;
                font-weight: 900;
                letter-spacing: -1px;
              }
              .tagline {
                font-size: 11px;
                letter-spacing: 3px;
                text-transform: uppercase;
                opacity: 0.8;
                margin-top: 8px;
              }
              .content {
                background: #ffffff;
                padding: 40px 30px;
                border: 1px solid #e5e5e5;
              }
              .welcome-text {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 20px;
                color: #000;
              }
              .message {
                font-size: 15px;
                line-height: 1.8;
                color: #555;
                margin-bottom: 30px;
              }
              .benefits {
                background: #f9f9f9;
                padding: 20px;
                border-left: 4px solid #000;
                margin: 30px 0;
              }
              .benefits h3 {
                margin-top: 0;
                font-size: 16px;
                font-weight: 700;
              }
              .benefits ul {
                margin: 0;
                padding-left: 20px;
              }
              .benefits li {
                margin: 8px 0;
                font-size: 14px;
              }
              .footer {
                background: #f5f5f5;
                padding: 30px;
                text-align: center;
                border-radius: 0 0 8px 8px;
                font-size: 12px;
                color: #888;
              }
              .social-links {
                margin: 20px 0;
              }
              .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #000;
                text-decoration: none;
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">PRE-SEE-JAN</div>
              <div class="tagline">Precision × Clarity</div>
            </div>
            
            <div class="content">
              <div class="welcome-text">Welcome to the Inner Circle! 🎉</div>
              
              <div class="message">
                <p>Thank you for subscribing to <strong>Pre-See-Jan</strong> updates.</p>
                
                <p>You're now part of an exclusive community that receives:</p>
              </div>

              <div class="benefits">
                <h3>What You'll Receive:</h3>
                <ul>
                  <li>🚀 Early access to new watch collections</li>
                  <li>💎 Exclusive limited edition releases</li>
                  <li>📚 Horological insights and styling guides</li>
                  <li>🎁 Special offers and member-only discounts</li>
                  <li>⚡ Behind-the-scenes content</li>
                </ul>
              </div>

              <div class="message">
                <p>At Pre-See-Jan, we craft timeless pieces for the discerning individual. Every watch tells a story of precision, elegance, and dedication.</p>
                
                <p>Stay tuned for our next update!</p>
              </div>
            </div>

            <div class="footer">
              <div class="social-links">
                <a href="https://www.linkedin.com/in/satyam-tiwari-359821292/">LinkedIn</a>
                <a href="https://www.instagram.com/satyamand536/">Instagram</a>
                <a href="https://x.com/SatyamT7_456">X (Twitter)</a>
              </div>
              
              <p>Pre-See-Jan | Crafted with ❤️ in Bharat</p>
              <p>Omvihar, Ghaziabad, Near ABES Engineering College, Uttar Pradesh</p>
              <p style="margin-top: 20px; font-size: 11px;">
                You're receiving this because you subscribed to our newsletter.<br>
                If you didn't subscribe, please ignore this email.
              </p>
            </div>
          </body>
          </html>
        `,
        text: `Welcome to the Inner Circle!
        
Thank you for subscribing to Pre-See-Jan updates.

You're now part of an exclusive community that receives:
• Early access to new watch collections
• Exclusive limited edition releases
• Horological insights and styling guides
• Special offers and member-only discounts
• Behind-the-scenes content

At Pre-See-Jan, we craft timeless pieces for the discerning individual.

Stay tuned for our next update!

---
Pre-See-Jan | Crafted with ❤️ in Bharat
Omvihar, Ghaziabad, Near ABES Engineering College, Uttar Pradesh`
      };

      const info = await transporter.sendMail(mailOptions);
      
      console.log('✅ Subscription email sent:', info.messageId);

      // Success response
      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed! Check your inbox for a confirmation email.',
        data: {
          email: subscriber.email,
          subscribedAt: subscriber.subscribedAt
        }
      });

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      
      // Email failed but subscriber was saved to DB
      // Delete the subscriber since email couldn't be sent
      await Subscriber.deleteOne({ _id: subscriber._id });
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send confirmation email. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

  } catch (error) {
    console.error('❌ Subscription error:', error);
    
    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/subscribe/count - Get subscriber count (optional)
router.get('/count', async (req, res) => {
  try {
    const count = await Subscriber.countDocuments({ isActive: true });
    res.json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get subscriber count'
    });
  }
});

module.exports = router;
