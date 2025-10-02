# DigitalOcean Deployment Guide
## Presidential Elections App - Ubuntu 20.04 Droplet

**Server IP**: 137.184.92.95  
**OS**: Ubuntu 20.04  
**Repository**: https://github.com/Rsypertjr/code_storage.git  
**Branch**: presidentelect  

## Step 1: Initial Server Setup

### Connect to your droplet
```bash
ssh root@137.184.92.95
```

### Update system packages
```bash
apt update && apt upgrade -y
```

### Install required packages
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install other dependencies
apt-get install -y nginx git ufw fail2ban htop

# Install PM2 globally
npm install -g pm2

# Verify installations
node --version
npm --version
nginx -v
```

## Step 2: Security Setup

### Configure firewall
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
```

### Create application user
```bash
adduser --system --shell /bin/bash --gecos 'App User' --group --disabled-password --home /home/appuser appuser
usermod -aG sudo appuser
```

## Step 3: Clone and Setup Application

### Clone repository
```bash
cd /var/www
git clone https://github.com/Rsypertjr/code_storage.git presidential-elections
cd presidential-elections
git checkout presidentelect

# Set permissions
chown -R appuser:appuser /var/www/presidential-elections
```

### Install dependencies and build
```bash
# Switch to app user
su - appuser
cd /var/www/presidential-elections

# Install dependencies
npm ci --production

# Build the application
npm run build
```

## Step 4: Environment Configuration

### Create production environment file
```bash
cp .env.production.template .env.production
nano .env.production
```

**Edit with your Supabase credentials:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=http://137.184.92.95
```

### Start application with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Follow the instructions from the startup command
```

## Step 5: Configure Nginx

### Copy nginx configuration
```bash
# As root user
exit  # Exit from appuser back to root
cp /var/www/presidential-elections/nginx-config-example /etc/nginx/sites-available/presidential-elections

# Enable the site
ln -s /etc/nginx/sites-available/presidential-elections /etc/nginx/sites-enabled/

# Remove default nginx site
rm /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Restart nginx
systemctl restart nginx
systemctl enable nginx
```

## Step 6: Test Deployment

### Check if services are running
```bash
# Check PM2 status
pm2 status

# Check nginx status
systemctl status nginx

# Check if app is responding
curl http://localhost:3000
curl http://137.184.92.95
```

## Step 7: Optional - SSL Setup (Recommended)

### Install Certbot for Let's Encrypt
```bash
apt install snapd
snap install core; snap refresh core
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
```

### Get SSL certificate (if you have a domain)
```bash
# If you have a domain pointing to 137.184.92.95
certbot --nginx -d your-domain.com
```

## Step 8: Monitoring and Maintenance

### Setup log rotation
```bash
cat > /etc/logrotate.d/presidential-elections << EOF
/home/appuser/.pm2/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    notifempty
    create 644 appuser appuser
    postrotate
        pm2 reloadLogs
    endscript
}
EOF
```

### Setup monitoring
```bash
# Install htop for system monitoring
apt install htop

# Setup PM2 monitoring
pm2 install pm2-logrotate
```

## Troubleshooting Commands

```bash
# Check application logs
pm2 logs presidential-elections

# Restart application
pm2 restart presidential-elections

# Check nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Check system resources
htop
df -h
free -h

# Check port usage
netstat -tulpn | grep :3000
netstat -tulpn | grep :80
```

## Quick Deployment Script Usage

Make the script executable and run:
```bash
chmod +x /var/www/presidential-elections/deploy.sh
/var/www/presidential-elections/deploy.sh
```

## Expected URLs
- **HTTP**: http://137.184.92.95
- **API Health Check**: http://137.184.92.95/api/detect-states
- **SSH Access**: ssh root@137.184.92.95

## Next Steps After Deployment
1. Test all functionality at http://137.184.92.95
2. Monitor logs for any errors
3. Consider setting up a domain name
4. Set up automated backups
5. Set up monitoring alerts