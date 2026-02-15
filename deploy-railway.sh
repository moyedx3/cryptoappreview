#!/bin/bash
# Railway deployment script for cryptoappreview

export RAILWAY_TOKEN="b5778598-a582-4224-ae91-90c761e351f8"

echo "Initializing Railway project..."
railway init --name cryptoappreview

echo "Adding PostgreSQL..."
railway add --database postgres

echo "Deploying..."
railway up

echo "Done! Check Railway dashboard for deployment status."
