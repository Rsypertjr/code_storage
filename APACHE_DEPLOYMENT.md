# DigitalOcean Apache Deployment Guide
## Presidential Elections App - Ubuntu 20.04 with Apache

**Server IP**: 137.184.92.95  
**OS**: Ubuntu 20.04  
**Web Server**: Apache2  
**Repository**: https://github.com/Rsypertjr/code_storage.git  
**Branch**: presidentelect  

## Important: Apache-Specific Setup

Since your droplet already has Apache running, this guide configures the app to work with Apache as a reverse proxy instead of Nginx.

## Step 1: Connect and Prepare

### Connect to your droplet
```bash
ssh root@137.184.92.95
```

### Check current Apache status
```bash
systemctl status apache2
apache2 -v
```

## Step 2: Run the Setup Script

The setup script has been modified for Apache. Run:
```bash
curl -sSL https://raw.githubusercontent.com/Rsypertjr/code_storage/presidentelect/setup-droplet.sh | bash
```

## What the Apache Setup Does

### 1. Apache Modules Enabled
- `mod_proxy` - For reverse proxy functionality
- `mod_proxy_http` - HTTP proxy support
- `mod_proxy_wstunnel` - WebSocket support
- `mod_headers` - Security headers
- `mod_rewrite` - URL rewriting
- `mod_ssl` - SSL support (for future HTTPS)

### 2. Virtual Host Configuration
The script creates `/etc/apache2/sites-available/presidential-elections.conf` with:
- Reverse proxy to Next.js app on localhost:3000
- WebSocket support for development features
- Security headers
- Proper logging

### 3. Site Management
- Disables default Apache site (`000-default`)
- Enables the presidential-elections site
- Tests configuration before applying

## Manual Apache Configuration (if needed)

### If you need to manually configure Apache:

```bash
# Enable required modules
sudo a2enmod proxy proxy_http proxy_wstunnel headers rewrite ssl

# Copy configuration
sudo cp /var/www/presidential-elections/apache-config-example /etc/apache2/sites-available/presidential-elections.conf

# Disable default site and enable ours
sudo a2dissite 000-default
sudo a2ensite presidential-elections

# Test and restart
sudo apache2ctl configtest
sudo systemctl restart apache2
```

## Troubleshooting Apache Issues

### Check Apache Status
```bash
sudo systemctl status apache2
sudo apache2ctl configtest
```

### View Apache Logs
```bash
# Error logs
sudo tail -f /var/log/apache2/presidential-elections-error.log
sudo tail -f /var/log/apache2/error.log

# Access logs
sudo tail -f /var/log/apache2/presidential-elections-access.log
sudo tail -f /var/log/apache2/access.log
```

### Check Apache Configuration
```bash
# List enabled sites
sudo a2ensite -l

# List enabled modules
sudo a2enmod -l

# Test configuration
sudo apache2ctl configtest
```

### Common Apache Commands
```bash
# Restart Apache
sudo systemctl restart apache2

# Reload Apache (without dropping connections)
sudo systemctl reload apache2

# Enable/disable sites
sudo a2ensite presidential-elections
sudo a2dissite 000-default

# Check which sites are enabled
ls -la /etc/apache2/sites-enabled/
```

## Port Configuration

### Default Setup:
- **Apache**: Listens on port 80 (HTTP)
- **Next.js App**: Runs on port 3000 (internal)
- **Apache Proxy**: Routes port 80 → port 3000

### Check Port Usage:
```bash
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000
```

## SSL Setup with Apache (Optional)

### For Let's Encrypt SSL:
```bash
# Install Certbot for Apache
sudo apt install python3-certbot-apache

# Get SSL certificate (if you have a domain)
sudo certbot --apache -d your-domain.com

# For IP-only setup, you'll need to manually configure SSL
```

## Testing the Setup

### 1. Test Next.js App Directly
```bash
curl http://localhost:3000
```

### 2. Test Through Apache
```bash
curl http://137.184.92.95
curl -I http://137.184.92.95  # Check headers
```

### 3. Test API Endpoints
```bash
curl http://137.184.92.95/api/detect-states
```

## Performance Tuning

### Apache Configuration Adjustments
Edit `/etc/apache2/apache2.conf` or create `/etc/apache2/conf-available/performance.conf`:

```apache
# Increase worker limits
ServerLimit 16
MaxRequestWorkers 400
ThreadsPerChild 25

# Enable compression
LoadModule deflate_module modules/mod_deflate.so
<Location />
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI \
        \.(?:gif|jpe?g|png)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI \
        \.(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
</Location>
```

## Monitoring Apache Performance

```bash
# Check Apache status
sudo systemctl status apache2

# Monitor real-time access logs
sudo tail -f /var/log/apache2/access.log

# Check Apache processes
ps aux | grep apache2

# Monitor system resources
htop
```

## Expected URLs
- **Main App**: http://137.184.92.95
- **API Health**: http://137.184.92.95/api/detect-states
- **Apache Status**: http://137.184.92.95/server-status (if mod_status enabled)

## Next Steps After Setup
1. Configure your Supabase environment variables
2. Test all functionality
3. Monitor Apache and application logs
4. Consider setting up SSL if you have a domain
5. Set up monitoring and backups

The main difference from Nginx is that Apache handles the reverse proxy instead, but the Next.js application still runs the same way on port 3000.