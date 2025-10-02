#!/bin/bash

# One-click setup script for DigitalOcean Ubuntu 20.04 droplet
# Run this script on your droplet: curl -sSL https://raw.githubusercontent.com/Rsypertjr/code_storage/presidentelect/setup-droplet.sh | bash

set -e

echo "🌊 DigitalOcean Presidential Elections App Setup"
echo "================================================"
echo "Server IP: 137.184.92.95"
echo "Setting up Ubuntu 20.04 droplet..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run this script as root"
    exit 1
fi

print_status "Step 1: Updating system packages..."
apt update && apt upgrade -y

print_status "Step 2: Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

print_status "Step 3: Installing system dependencies..."
apt-get install -y git ufw fail2ban htop curl wget

print_status "Step 3a: Checking Apache installation..."
if systemctl is-active --quiet apache2; then
    print_status "✅ Apache is already installed and running"
else
    print_warning "Apache not found or not running. Installing Apache..."
    apt-get install -y apache2
    systemctl enable apache2
    systemctl start apache2
fi

print_status "Step 4: Installing PM2..."
npm install -g pm2

print_status "Step 5: Configuring firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Apache Full'
ufw --force enable

print_status "Step 6: Creating application user..."
if ! id "appuser" &>/dev/null; then
    adduser --system --shell /bin/bash --gecos 'App User' --group --disabled-password --home /home/appuser appuser
fi

print_status "Step 7: Cloning application repository..."
cd /var/www
if [ -d "presidential-elections" ]; then
    print_warning "Directory exists, updating..."
    cd presidential-elections
    git pull origin presidentelect
else
    git clone https://github.com/Rsypertjr/code_storage.git presidential-elections
    cd presidential-elections
    git checkout presidentelect
fi

print_status "Step 8: Setting permissions..."
chown -R appuser:appuser /var/www/presidential-elections

print_status "Step 9: Installing Node.js dependencies..."
sudo -u appuser bash -c "cd /var/www/presidential-elections && npm ci"

print_status "Step 10: Building application..."
sudo -u appuser bash -c "cd /var/www/presidential-elections && npm run build"

print_status "Step 11: Setting up environment file..."
if [ ! -f "/var/www/presidential-elections/.env.production" ]; then
    cp /var/www/presidential-elections/.env.production.template /var/www/presidential-elections/.env.production
    chown appuser:appuser /var/www/presidential-elections/.env.production
    print_warning "Please edit /var/www/presidential-elections/.env.production with your Supabase credentials"
fi

print_status "Step 12: Starting application with PM2..."
sudo -u appuser bash -c "cd /var/www/presidential-elections && pm2 start ecosystem.config.js"
sudo -u appuser bash -c "pm2 save"

# Setup PM2 startup
sudo -u appuser bash -c "pm2 startup" | grep "sudo" | bash

print_status "Step 13: Configuring Apache..."
# Enable required Apache modules
a2enmod proxy
a2enmod proxy_http
a2enmod proxy_wstunnel
a2enmod headers
a2enmod rewrite
a2enmod ssl

# Copy Apache configuration
cp /var/www/presidential-elections/apache-config-example /etc/apache2/sites-available/presidential-elections.conf

# Disable default site and enable our site
a2dissite 000-default
a2ensite presidential-elections

# Test Apache configuration
if apache2ctl configtest; then
    print_status "Apache configuration is valid"
    systemctl restart apache2
    systemctl enable apache2
else
    print_error "Apache configuration test failed"
    exit 1
fi

print_status "Step 14: Final checks..."
sleep 5

# Check if PM2 is running
if sudo -u appuser pm2 list | grep -q "presidential-elections"; then
    print_status "✅ PM2 application is running"
else
    print_error "❌ PM2 application is not running"
fi

# Check if Apache is running
if systemctl is-active --quiet apache2; then
    print_status "✅ Apache is running"
else
    print_error "❌ Apache is not running"
fi

# Check if application responds
if curl -s http://localhost:3000 > /dev/null; then
    print_status "✅ Application is responding on port 3000"
else
    print_warning "⚠️  Application might not be ready yet"
fi

echo ""
echo "🎉 Setup completed!"
echo "================================================"
echo "Your application should be available at:"
echo "🌐 http://137.184.92.95"
echo ""
echo "Next steps:"
echo "1. Edit your environment variables:"
echo "   nano /var/www/presidential-elections/.env.production"
echo ""
echo "2. Restart the application after editing env:"
echo "   sudo -u appuser pm2 restart presidential-elections"
echo ""
echo "3. Check application status:"
echo "   sudo -u appuser pm2 status"
echo "   sudo -u appuser pm2 logs presidential-elections"
echo ""
echo "4. SSH back into your server:"
echo "   ssh root@137.184.92.95"
echo ""
print_warning "Don't forget to configure your Supabase environment variables!"