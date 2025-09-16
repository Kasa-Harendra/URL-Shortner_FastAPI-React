#!/usr/bin/env bash
set -o errexit  # exit on error

# Build frontend
cd frontend
npm install
npm run build
cd ..

# Install backend dependencies
pip install -r backend/requirements.txt
