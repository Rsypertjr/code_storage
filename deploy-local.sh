#!/bin/bash

# Local deployment script to push changes and deploy to DigitalOcean
# Run this from your local development machine

set -e

echo "🚀 Deploying Presidential Elections App to aipreselect.rsypertjr.net"
echo "=================================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from your project root directory"
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Committing them now..."
    git add .
    read -p "Enter commit message: " commit_message
    git commit -m "$commit_message"
fi

print_status "Pushing changes to GitHub..."
git push origin presidentelect

print_status "Connecting to server and deploying..."

# Check if SSH key exists
if [ ! -f ~/.ssh/id_ed25519 ] && [ ! -f ~/.ssh/id_rsa ]; then
    print_error "No SSH key found. Please set up SSH key authentication first."
    echo "Run: ssh-keygen -t ed25519 -C 'your-email@example.com'"
    echo "Then copy the public key to your server's ~/.ssh/authorized_keys"
    exit 1
fi

# Deploy to server
ssh root@137.184.92.95 << 'EOF'
    echo "🔄 Updating application on server..."
    
    cd /var/www/presidential-elections
    
    # Pull latest changes
    git pull origin presidentelect
    
    # Install any new dependencies
    sudo -u appuser npm ci
    
    # Build the application
    sudo -u appuser npm run build
    
    # Restart the application
    sudo -u appuser pm2 restart presidential-elections
    
    # Reload Apache
    apache2ctl configtest && systemctl reload apache2
    
    echo "✅ Deployment completed!"
    echo "🌐 App available at: https://aipreselect.rsypertjr.net"
    
    # Show status
    echo "📊 Application Status:"
    sudo -u appuser pm2 list
    
    echo "📊 Apache Status:"
    systemctl status apache2 --no-pager -l
EOF

print_status "Deployment completed!"
print_status "🌐 Your app should be available at: https://aipreselect.rsypertjr.net"

# Test the deployment
print_status "Testing deployment..."
if curl -s --connect-timeout 10 https://aipreselect.rsypertjr.net > /dev/null; then
    print_status "✅ Deployment successful! Site is responding."
else
    print_warning "⚠️ Site might still be starting up. Check manually at https://aipreselect.rsypertjr.net"
fi