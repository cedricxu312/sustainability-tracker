#!/bin/bash

# Sustainability Tracker Backend Startup Script
echo "🌱 Starting Sustainability Tracker Backend..."

# Check if port 3001 is already in use
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3001 is already in use!"
    echo "📋 Running processes on port 3001:"
    lsof -i :3001
    
    echo ""
    echo "🛑 Stopping existing processes..."
    pkill -f "node server.js"
    
    # Wait a moment for processes to stop
    sleep 2
    
    # Check again
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ Failed to stop existing processes. Please manually kill them:"
        echo "   kill \$(lsof -t -i:3001)"
        exit 1
    else
        echo "✅ Successfully stopped existing processes"
    fi
fi

echo "🚀 Starting server on port 3001..."
node server.js
