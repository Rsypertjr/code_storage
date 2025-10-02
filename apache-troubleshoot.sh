#!/bin/bash

# Apache troubleshooting script for Presidential Elections app
# Run this if you encounter issues with the Apache setup

echo "🔍 Apache Troubleshooting for Presidential Elections App"
echo "======================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "1. Checking Apache Status..."
echo "============================"
if systemctl is-active --quiet apache2; then
    print_success "Apache is running"
    systemctl status apache2 --no-pager -l
else
    print_error "Apache is not running"
    echo "Starting Apache..."
    systemctl start apache2
fi

echo ""
echo "2. Checking Apache Configuration..."
echo "=================================="
if apache2ctl configtest 2>/dev/null; then
    print_success "Apache configuration is valid"
else
    print_error "Apache configuration has errors:"
    apache2ctl configtest
fi

echo ""
echo "3. Checking Required Modules..."
echo "=============================="
required_modules=("proxy" "proxy_http" "proxy_wstunnel" "headers" "rewrite")

for module in "${required_modules[@]}"; do
    if apache2ctl -M 2>/dev/null | grep -q "${module}_module"; then
        print_success "Module $module is enabled"
    else
        print_warning "Module $module is not enabled"
        echo "   Enable with: sudo a2enmod $module"
    fi
done

echo ""
echo "4. Checking Site Configuration..."
echo "================================"
if [ -f "/etc/apache2/sites-available/presidential-elections.conf" ]; then
    print_success "Presidential elections site config exists"
    
    if [ -L "/etc/apache2/sites-enabled/presidential-elections.conf" ]; then
        print_success "Presidential elections site is enabled"
    else
        print_warning "Presidential elections site is not enabled"
        echo "   Enable with: sudo a2ensite presidential-elections"
    fi
else
    print_error "Presidential elections site config not found"
    echo "   Copy from: /var/www/presidential-elections/apache-config-example"
fi

echo ""
echo "5. Checking Port Usage..."
echo "========================"
print_info "Checking port 80 (Apache):"
if netstat -tulpn 2>/dev/null | grep -q ":80 "; then
    netstat -tulpn | grep ":80 "
    print_success "Port 80 is in use"
else
    print_warning "Port 80 is not in use"
fi

print_info "Checking port 3001 (Next.js):"
if netstat -tulpn 2>/dev/null | grep -q ":3001 "; then
    netstat -tulpn | grep ":3001 "
    print_success "Port 3001 is in use"
else
    print_warning "Port 3001 is not in use (Next.js app may not be running)"
fi

echo ""
echo "6. Testing Connectivity..."
echo "========================="
print_info "Testing localhost:3001 (Next.js direct):"
if curl -s --connect-timeout 5 http://localhost:3001 > /dev/null; then
    print_success "Next.js app is responding"
else
    print_error "Next.js app is not responding"
    echo "   Check PM2 status: sudo -u appuser pm2 status"
fi

print_info "Testing localhost:80 (Apache proxy):"
if curl -s --connect-timeout 5 http://localhost > /dev/null; then
    print_success "Apache proxy is working"
else
    print_error "Apache proxy is not working"
fi

print_info "Testing external access (137.184.92.95):"
if curl -s --connect-timeout 5 http://137.184.92.95 > /dev/null; then
    print_success "External access is working"
else
    print_warning "External access may have issues"
    echo "   Check firewall: sudo ufw status"
fi

echo ""
echo "7. Checking Application Status..."
echo "================================"
if command -v sudo >/dev/null && id appuser >/dev/null 2>&1; then
    print_info "PM2 processes:"
    sudo -u appuser pm2 list
    
    echo ""
    print_info "Recent PM2 logs:"
    sudo -u appuser pm2 logs presidential-elections --lines 10 --nostream
else
    print_warning "Cannot check PM2 status (appuser not found or no sudo)"
fi

echo ""
echo "8. Recent Apache Logs..."
echo "======================="
if [ -f "/var/log/apache2/error.log" ]; then
    print_info "Recent Apache error log entries:"
    tail -10 /var/log/apache2/error.log
else
    print_warning "Apache error log not found"
fi

if [ -f "/var/log/apache2/presidential-elections-error.log" ]; then
    echo ""
    print_info "Recent app-specific error log entries:"
    tail -10 /var/log/apache2/presidential-elections-error.log
fi

echo ""
echo "9. Quick Fix Commands..."
echo "======================="
echo "If you found issues above, try these commands:"
echo ""
echo "# Restart services:"
echo "sudo systemctl restart apache2"
echo "sudo -u appuser pm2 restart presidential-elections"
echo ""
echo "# Enable required modules:"
echo "sudo a2enmod proxy proxy_http proxy_wstunnel headers rewrite"
echo ""
echo "# Enable site:"
echo "sudo a2ensite presidential-elections"
echo "sudo a2dissite 000-default"
echo ""
echo "# Test and reload:"
echo "sudo apache2ctl configtest"
echo "sudo systemctl reload apache2"
echo ""
echo "# Check firewal rules:"
echo "sudo ufw status"
echo "sudo ufw allow 'Apache Full'"
echo ""
echo "Troubleshooting complete!"