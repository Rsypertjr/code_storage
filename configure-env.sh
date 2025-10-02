#!/bin/bash

# Environment configuration helper for DigitalOcean deployment
# Run this after the main setup to configure your environment variables

echo "🔧 Environment Configuration Helper"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Please run this script from the application directory:"
    echo "cd /var/www/presidential-elections && ./configure-env.sh"
    exit 1
fi

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "Creating .env.production from template..."
    cp .env.production.template .env.production
fi

echo "Please provide your Supabase credentials:"
echo ""

# Get Supabase URL
read -p "Enter your Supabase URL: " SUPABASE_URL
if [ -n "$SUPABASE_URL" ]; then
    sed -i "s|your_supabase_project_url|$SUPABASE_URL|g" .env.production
fi

# Get Supabase Anon Key
read -p "Enter your Supabase Anon Key: " SUPABASE_ANON_KEY
if [ -n "$SUPABASE_ANON_KEY" ]; then
    sed -i "s|your_supabase_anon_key|$SUPABASE_ANON_KEY|g" .env.production
fi

# Get Supabase Service Role Key
read -p "Enter your Supabase Service Role Key: " SUPABASE_SERVICE_KEY
if [ -n "$SUPABASE_SERVICE_KEY" ]; then
    sed -i "s|your_supabase_service_role_key|$SUPABASE_SERVICE_KEY|g" .env.production
fi

echo ""
echo "✅ Environment configuration updated!"
echo ""
echo "Current .env.production contents:"
echo "================================"
cat .env.production
echo ""
echo "To restart the application with new environment:"
echo "pm2 restart presidential-elections"
echo ""
echo "To view application logs:"
echo "pm2 logs presidential-elections"