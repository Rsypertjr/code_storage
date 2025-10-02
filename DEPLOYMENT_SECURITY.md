# Security Checklist for Production Deployment

## Server Security
- [ ] Update system packages: `sudo apt update && sudo apt upgrade`
- [ ] Configure firewall: `sudo ufw enable` and allow only necessary ports
- [ ] Set up SSH key authentication and disable password login
- [ ] Create non-root user for application
- [ ] Install fail2ban: `sudo apt install fail2ban`

## Application Security
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS with SSL certificate (Let's Encrypt)
- [ ] Set secure headers in nginx/next.js
- [ ] Use PM2 or Docker for process management
- [ ] Set up log rotation
- [ ] Configure CORS properly

## Database Security
- [ ] Use Supabase RLS (Row Level Security)
- [ ] Rotate API keys regularly
- [ ] Use service role key only on server-side
- [ ] Monitor database access logs

## Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation
- [ ] Set up error tracking (Sentry)
- [ ] Monitor resource usage

## Backup
- [ ] Database backups (Supabase handles this)
- [ ] Application code backups
- [ ] Configuration file backups