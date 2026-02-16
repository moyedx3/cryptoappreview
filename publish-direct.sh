#!/bin/bash
# Direct publishing script for CryptoAppReview
# Bypasses admin panel and publishes via API

SITE_URL="https://cryptoappreview-production.up.railway.app"

# Function to publish article
publish_article() {
  local title="$1"
  local subtitle="$2"
  local description="$3"
  local content="$4"
  local rating="$5"
  local category="$6"
  local image_url="${7:-}"

  # Get category ID from category name
  case "$category" in
    "Exchange") category_id=2 ;;
    "Wallet") category_id=1 ;;
    "DeFi") category_id=3 ;;
    "Security") category_id=4 ;;
    "NFT") category_id=5 ;;
    "Lending") category_id=6 ;;
    "Staking") category_id=7 ;;
    "Bridges") category_id=8 ;;
    "Tools") category_id=9 ;;
    *) category_id=2 ;; # Default to Exchange
  esac

  # Create JSON payload
  json_payload=$(cat <<EOF
{
  "title": "$title",
  "subtitle": "$subtitle",
  "description": "$description",
  "content": "$content",
  "rating": $rating,
  "category_id": $category_id,
  "image_url": "$image_url",
  "is_published": true,
  "is_featured": false
}
EOF
)

  # Post to API
  response=$(curl -s -X POST "${SITE_URL}/api/articles" \
    -H "Content-Type: application/json" \
    -d "$json_payload")

  echo "Response: $response"
}

# Usage example:
# publish_article "App Name" "Subtitle" "Description" "Content" 7 "Exchange" "https://image.url"
