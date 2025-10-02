#!/bin/bash

# Port Update Script - Change from port 3000 to 3001
# Run this script on your server after deploying the updated configuration

set -e

echo "🔄 Updating Presidential Elections App to use port 3001"
echo "====================================================="

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
    print_error "Please run this script from /var/www/presidential-elections"
    exit 1
fi

print_status "Step 1: Updating environment configuration..."
if [ -f ".env.production" ]; then
    # Update PORT in .env.production if it exists
    if grep -q "PORT=3000" .env.production; then
        sed -i 's/PORT=3000/PORT=3001/' .env.production
        print_status "Updated PORT in .env.production"
    elif grep -q "PORT=" .env.production; then
        sed -i 's/PORT=.*/PORT=3001/' .env.production
        print_status "Updated existing PORT in .env.production"
    else
        echo "PORT=3001" >> .env.production
        print_status "Added PORT=3001 to .env.production"
    fi
else
    print_warning ".env.production not found, creating from template..."
    cp .env.production.template .env.production
    chown appuser:appuser .env.production
fi

print_status "Step 2: Updating Apache configuration..."
if [ -f "/etc/apache2/sites-available/presidential-elections.conf" ]; then
    # Update Apache virtual host configuration
    if grep -q "localhost:3000" /etc/apache2/sites-available/presidential-elections.conf; then
        sed -i 's/localhost:3000/localhost:3001/g' /etc/apache2/sites-available/presidential-elections.conf
        print_status "Updated Apache virtual host configuration"
        
        # Test Apache configuration
        if apache2ctl configtest; then
            print_status "Apache configuration test passed"
        else
            print_error "Apache configuration test failed"
            exit 1
        fi
    else
        print_status "Apache configuration already updated or uses different format"
    fi
else
    print_warning "Apache configuration not found, copying from template..."
    cp apache-config-example /etc/apache2/sites-available/presidential-elections.conf
    a2ensite presidential-elections
fi

print_status "Step 3: Stopping application..."
if sudo -u appuser pm2 list | grep -q "presidential-elections"; then
    sudo -u appuser pm2 stop presidential-elections
    print_status "Application stopped"
else
    print_warning "Application not found in PM2"
fi

print_status "Step 4: Rebuilding application..."
sudo -u appuser npm run build

print_status "Step 5: Starting application on new port..."
sudo -u appuser pm2 start ecosystem.config.js
sudo -u appuser pm2 save

print_status "Step 6: Reloading Apache..."
systemctl reload apache2

print_status "Step 7: Testing new configuration..."
sleep 5

# Test if app is running on new port
if curl -s --connect-timeout 10 http://localhost:3001 > /dev/null; then
    print_status "✅ Application is responding on port 3001"
else
    print_warning "⚠️ Application may still be starting up on port 3001"
fi

# Test if Apache proxy is working
if curl -s --connect-timeout 10 http://localhost > /dev/null; then
    print_status "✅ Apache proxy is working"
else
    print_error "❌ Apache proxy is not working"
fi

# Check port usage
print_status "Port usage check:"
if netstat -tulpn 2>/dev/null | grep -q ":3001 "; then
    echo "Port 3001: $(netstat -tulpn | grep ':3001 ' | awk '{print $1, $7}')"
    print_status "✅ Port 3001 is in use"
else
    print_warning "⚠️ Port 3001 is not showing as in use"
fi

if netstat -tulpn 2>/dev/null | grep -q ":3000 "; then
    print_warning "⚠️ Port 3000 is still in use - you may need to stop other services"
    netstat -tulpn | grep ':3000 '
fi

print_status "Step 8: Final status check..."
echo ""
echo "📊 PM2 Status:"
sudo -u appuser pm2 list

echo ""
echo "📊 Apache Status:"
systemctl status apache2 --no-pager -l | head -10

echo ""
echo "🎉 Port update completed!"
echo "================================================="
echo "Your application should now be running on port 3001"
echo "🌐 Test URLs:"
echo "  - Direct: http://localhost:3001"
echo "  - Through Apache: http://137.184.92.95"
echo "  - Domain: https://aipreselect.rsypertjr.net"
echo ""
echo "🔍 Troubleshooting:"
echo "  - Check logs: sudo -u appuser pm2 logs presidential-elections"
echo "  - Check Apache: tail -f /var/log/apache2/presidential-elections-error.log"
echo "  - Run diagnostics: ./apache-troubleshoot.sh"