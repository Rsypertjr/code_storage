#!/bin/bash

# Deployment script for presidential elections app to DigitalOcean droplet
# Server IP: 137.184.92.95
set -e

echo "🚀 Starting deployment to DigitalOcean droplet..."

# Variables
APP_DIR="/var/www/presidential-elections"
REPO_URL="https://github.com/Rsypertjr/code_storage.git"
BRANCH="presidentelect"
SERVER_IP="137.184.92.95"

# Pull latest changes
echo "📥 Pulling latest changes..."
cd $APP_DIR
git pull origin $BRANCH

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build the application
echo "🔨 Building application..."
npm run build

# Restart the application with PM2
echo "🔄 Restarting application..."
pm2 restart presidential-elections

# Reload Apache
echo "🔄 Reloading Apache..."
sudo apache2ctl configtest && sudo systemctl reload apache2

echo "✅ Deployment completed successfully!"
echo "🌐 App should be available at: http://137.184.92.95"
echo "🔧 SSH into server: ssh root@137.184.92.95"