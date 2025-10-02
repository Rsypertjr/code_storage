# Presidential Elections App - Production Build

This is a standalone production build of the Presidential Elections application.

## Quick Start

1. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   nano .env  # Edit with your actual values
   ```

2. **Start the Application**:
   ```bash
   ./start.sh
   ```

   Or manually:
   ```bash
   export $(cat .env | grep -v '^#' | xargs)
   node server.js
   ```

## Configuration

### Required Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### Optional Environment Variables:
- `PORT` - Port to run the server on (default: 3001)
- `NODE_ENV` - Environment mode (should be 'production')
- `NEXT_PUBLIC_APP_URL` - Your app's public URL

## System Requirements

- Node.js 18+ 
- Linux/macOS/Windows
- 1GB RAM minimum
- 10GB disk space

## Deployment Options

### Option 1: Direct Execution
```bash
./start.sh
```

### Option 2: PM2 (Recommended for production)
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

The ecosystem.config.js file is automatically created by start.sh for PM2 compatibility.

### Option 3: Docker
```bash
docker build -t presidential-elections .
docker run -p 3001:3001 --env-file .env presidential-elections
```

### Option 4: Systemd Service
Create `/etc/systemd/system/presidential-elections.service`:
```ini
[Unit]
Description=Presidential Elections App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/this/directory
EnvironmentFile=/path/to/this/directory/.env
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable presidential-elections
sudo systemctl start presidential-elections
```

## Reverse Proxy Setup

### Apache Virtual Host:
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/
    ProxyPreserveHost On
</VirtualHost>
```

### Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Monitoring

Check application logs:
```bash
# If using PM2
pm2 logs presidential-elections

# If using systemd
journalctl -u presidential-elections -f

# If running directly
# Check console output where you started the app
```

## Troubleshooting

1. **Port already in use**: Change the PORT in .env file
2. **Environment variables not loaded**: Make sure .env file exists and is readable
3. **Database connection issues**: Verify your Supabase credentials
4. **Permission issues**: Make sure the user has read/write permissions to the directory

## Support

For issues and updates, check the original repository:
https://github.com/Rsypertjr/code_storage/tree/presidentelect
