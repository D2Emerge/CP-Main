set -e

ENVIRONMENT=${1:-"stage"}
OUTPUT_PATH=${2:-"./src/generated"}

if [ "$ENVIRONMENT" = "local" ]; then
  API_URL="http://localhost:8289/v1/api/json"
elif [ "$ENVIRONMENT" = "stage" ]; then
  API_URL="https://idp-staging.codeproject.com/v1/api/json"
elif [ "$ENVIRONMENT" = "prod" ]; then
  API_URL="https://idp.codeproject.com/v1/api/json"
else
  API_URL=""
fi

if [ -z "$API_URL" ]; then
  echo "❌ Invalid environment: $ENVIRONMENT"
  echo "Available environments: local, stage, prod"
  exit 1
fi

echo "🚀 Generating frontend types from $ENVIRONMENT environment..."
echo "📡 API URL: $API_URL"
echo "📁 Output: $OUTPUT_PATH"

echo "🔍 Checking API accessibility..."
if ! curl -s --head "$API_URL" > /dev/null; then
  echo "❌ API not accessible at $API_URL"
  echo "Make sure the server is running and accessible."
  exit 1
fi

echo "✅ API is accessible"

mkdir -p "$OUTPUT_PATH"

echo "⚡️ Generating TypeScript client..."
npx openapi-typescript-codegen \
  --input "$API_URL" \
  --output "$OUTPUT_PATH" \
  --client axios \
  --useOptions true \
  --useUnionTypes true \
  --exportCore true \
  --exportServices true \
  --exportModels true \
  --postfixServices "Service"


echo "✅ Frontend types generated successfully!"
echo "📦 Package created at: $OUTPUT_PATH"
echo "🔧 TypeScript configuration created for modern syntax support"
echo ""
echo "🔧 To use in your frontend:"
echo "1. Import and use the generated types and services"
echo ""
echo "🚀 Example usage:"
echo "import { UserService } from './path/to/generated';"