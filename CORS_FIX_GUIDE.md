# CORS Fix for Render Backend

## Problem
Your Render backend at `https://trustique-assist.onrender.com` is rejecting requests from your Netlify frontend due to CORS policy mismatch. The backend was configured to accept `https://trustiqueassist21.netlify.app/` (with trailing slash) but your frontend sends requests from `https://trustiqueassist21.netlify.app` (without trailing slash).

## Solution Applied
I've updated your local `server.js` with a dynamic CORS configuration that:

1. **Handles both URL formats** (with and without trailing slash)
2. **Supports wildcard matching** for Netlify domains
3. **Allows requests with no origin** (mobile apps, curl, etc.)

## Updated CORS Configuration
```javascript
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5174',
      'https://trustiqueassist21.netlify.app',
      'https://*.netlify.app'
    ];
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

## Next Steps

### 1. Update Your Render Backend
You need to update your Render deployment with this new CORS configuration:

1. **Go to your Render dashboard**
2. **Navigate to your backend service**
3. **Update the code** with the new CORS configuration
4. **Redeploy your backend**

### 2. Alternative: Quick Fix via Render Dashboard
If you want a quicker fix, you can temporarily update your environment variables in Render:

1. Go to your Render dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Add this environment variable:
   ```
   CORS_ORIGIN=https://trustiqueassist21.netlify.app
   ```
5. Redeploy

### 3. Test the Fix
After updating your Render backend, test it:

```bash
curl -H "Origin: https://trustiqueassist21.netlify.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://trustique-assist.onrender.com/api/testimonials
```

Or test directly from your browser console on your Netlify site.

## Verification
The fix should resolve the CORS error and allow your Netlify frontend to communicate with your Render backend successfully.

## Local Testing
Your local backend is now running with the fixed CORS configuration and is ready for testing.