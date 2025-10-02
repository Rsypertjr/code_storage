#!/bin/bash

# Startup script for Presidential Elections App

echo "🚀 Starting Presidential Elections App..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please copy .env.example to .env and configure your variables."
    exit 1
fi

# Source environment variables
export $(cat .env | grep -v '^#' | xargs)

# Set default port if not specified
export PORT=${PORT:-3001}

echo "📡 Starting server on port $PORT..."
echo "🌐 App will be available at: http://localhost:$PORT"

# Check if PM2 is available
if command -v pm2 >/dev/null 2>&1; then
    echo "Using PM2 for process management..."
    
    # Create PM2 ecosystem config
    cat > ecosystem.config.js << 'EOFPM2'
module.exports = {
  apps: [{
    name: 'presidential-elections',
    script: 'server.js',
    cwd: process.cwd(),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_file: '.env',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOFPM2
    
    # Start with PM2
    pm2 start ecosystem.config.js
    pm2 save
    echo "✅ Started with PM2. Use 'pm2 status' to check status."
else
    echo "PM2 not found, starting with Node.js directly..."
    # Start the application
    node server.js
fi
