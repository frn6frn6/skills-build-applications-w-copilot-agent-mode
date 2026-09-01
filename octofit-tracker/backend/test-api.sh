#!/bin/bash

# Test script for OctoFit API endpoints
# Supports both Codespaces and localhost

# Determine API base URL
if [ -n "$CODESPACE_NAME" ]; then
  API_BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
else
  API_BASE_URL="http://localhost:8000"
fi

echo "=========================================="
echo "OctoFit API Test Suite"
echo "=========================================="
echo "API Base URL: $API_BASE_URL"
echo ""

# Test health endpoint
echo "Testing /health endpoint..."
curl -s "${API_BASE_URL}/health" | jq . || echo "Failed to reach health endpoint"
echo ""

# Test configuration endpoint
echo "Testing /config endpoint..."
curl -s "${API_BASE_URL}/config" | jq . || echo "Failed to reach config endpoint"
echo ""

# Test users endpoint
echo "Testing /api/users endpoint..."
curl -s "${API_BASE_URL}/api/users" | jq . || echo "Failed to reach users endpoint"
echo ""

# Test activities endpoint
echo "Testing /api/activities endpoint..."
curl -s "${API_BASE_URL}/api/activities" | jq . || echo "Failed to reach activities endpoint"
echo ""

# Test workouts endpoint
echo "Testing /api/workouts endpoint..."
curl -s "${API_BASE_URL}/api/workouts" | jq . || echo "Failed to reach workouts endpoint"
echo ""

echo "=========================================="
echo "Test suite complete!"
echo "=========================================="
