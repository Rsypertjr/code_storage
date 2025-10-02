# Secure Deployment Guide for aipreselect.rsypertjr.net
## Presidential Elections App - DigitalOcean Droplet

**Domain**: aipreselect.rsypertjr.net  
**Server IP**: 137.184.92.95  
**Repository**: https://github.com/Rsypertjr/code_storage.git  
**Branch**: presidentelect  

## ⚠️ SECURITY FIRST - SSH Key Setup

**IMPORTANT**: Never use passwords for SSH in production. Set up SSH keys instead:

### 1. Generate SSH Key (on your local machine)
```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy the public key to clipboard (on Mac)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy the public key to clipboard (on Linux)
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
```

### 2. Add SSH Key to DigitalOcean Droplet
```bash
# SSH into your droplet ONE LAST TIME with password
ssh root@137.184.92.95

# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key to authorized_keys
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Test the key-based login from another terminal
# ssh root@137.184.92.95

# Once confirmed working, disable password authentication
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd
```

## 🚀 Deployment Steps

### Step 1: Connect with SSH Key
```bash
ssh root@137.184.92.95
```

### Step 2: Run the Setup Script
```bash
curl -sSL https://raw.githubusercontent.com/Rsypertjr/code_storage/presidentelect/setup-droplet.sh | bash
```

### Step 3: Configure Environment Variables
```bash
cd /var/www/presidential-elections
./configure-env.sh
```

**Enter your Supabase credentials when prompted:**
- Supabase URL
- Supabase Anon Key  
- Supabase Service Role Key

### Step 4: Set Up SSL Certificate (Recommended)
```bash
# Install Certbot
apt install snapd
snap install core; snap refresh core
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

# Get SSL certificate for your domain
certbot --apache -d aipreselect.rsypertjr.net

# Test automatic renewal
certbot renew --dry-run
```

### Step 5: Test the Deployment
Visit these URLs to verify:
- **HTTPS**: https://aipreselect.rsypertjr.net
- **HTTP**: http://aipreselect.rsypertjr.net  
- **Direct IP**: http://137.184.92.95
- **API Test**: https://aipreselect.rsypertjr.net/api/detect-states

## 🔧 Post-Deployment Configuration

### Update DNS (if needed)
Make sure your domain `aipreselect.rsypertjr.net` points to `137.184.92.95`:
```bash
# Check current DNS resolution
nslookup aipreselect.rsypertjr.net
dig aipreselect.rsypertjr.net
```

### Configure Firewall
```bash
# Check current firewall status
ufw status

# Allow necessary ports
ufw allow ssh
ufw allow 'Apache Full'
ufw enable
```

### Set Up Monitoring
```bash
# Check application status
sudo -u appuser pm2 status
sudo -u appuser pm2 monit

# Check Apache status
systemctl status apache2
apache2ctl configtest
```

## 🛠️ Maintenance Commands

### Application Updates
```bash
cd /var/www/presidential-elections
./deploy.sh
```

### View Logs
```bash
# Application logs
sudo -u appuser pm2 logs presidential-elections

# Apache logs
tail -f /var/log/apache2/presidential-elections-error.log
tail -f /var/log/apache2/presidential-elections-access.log
```

### Restart Services
```bash
# Restart application
sudo -u appuser pm2 restart presidential-elections

# Restart Apache
systemctl restart apache2
```

### Troubleshooting
```bash
# Run troubleshooting script
cd /var/www/presidential-elections
./apache-troubleshoot.sh
```

## 🔒 Security Checklist

- [ ] SSH key authentication enabled
- [ ] Password authentication disabled
- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed
- [ ] Environment variables secured
- [ ] Regular backups scheduled
- [ ] Monitoring set up
- [ ] Log rotation configured

## 📋 Expected URLs After Deployment

- **Primary Domain**: https://aipreselect.rsypertjr.net
- **HTTP Fallback**: http://aipreselect.rsypertjr.net
- **Direct IP**: http://137.184.92.95
- **API Health**: https://aipreselect.rsypertjr.net/api/detect-states

## 🆘 Emergency Recovery

If something goes wrong:
```bash
# Check all services
systemctl status apache2
sudo -u appuser pm2 status

# Restart everything
systemctl restart apache2
sudo -u appuser pm2 restart all

# Check logs for errors
journalctl -u apache2 -f
sudo -u appuser pm2 logs --error
```

## 📞 Support Commands

```bash
# System information
uname -a
df -h
free -h
htop

# Network information  
netstat -tulpn | grep :80
netstat -tulpn | grep :3000
curl -I http://localhost:3000
curl -I https://aipreselect.rsypertjr.net
```

Remember: Always use SSH keys instead of passwords for production servers!