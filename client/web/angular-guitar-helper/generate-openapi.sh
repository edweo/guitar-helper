# Directory containing  OpenAPI spec files
SPEC_DIR="../../../server/openapi"
# Output directory for generated services
OUTPUT_DIR="generated-sources/openapi"

# Loop through each OpenAPI spec file in the directory
for spec in "$SPEC_DIR"/*.json; do
  # Extract the base name of the file (without extension)
  base_name=$(basename "$spec" .json)

  echo $base_name
  echo $spec

  # Generate the service for the current spec file
  openapi-generator-cli generate -i "$spec" -g typescript-angular -o "$OUTPUT_DIR/$base_name" --additional-properties=ngVersion=19.2.10,npmName=resrClient,supportsES6=true,npmVersion=11.2,withInterfaces=true

  echo "Generated service for $base_name"
done
