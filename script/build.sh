#!/bin/bash
set -eo pipefail

# Install bun
if ! command -v bun &> /dev/null; then
  curl -fsSL https://bun.sh/install | bash
  export PATH="$HOME/.bun/bin:$PATH"
fi

bun install

# Map GOOS/GOARCH (used by gh-extension-precompile) to bun targets
declare -A BUN_TARGETS=(
  ["darwin-arm64"]="bun-darwin-arm64"
  ["darwin-amd64"]="bun-darwin-x64"
  ["linux-amd64"]="bun-linux-x64"
  ["linux-arm64"]="bun-linux-arm64"
  ["windows-amd64"]="bun-windows-x64"
)

mkdir -p dist

for platform in "${!BUN_TARGETS[@]}"; do
  target="${BUN_TARGETS[$platform]}"
  output="dist/${platform}"

  # Windows needs .exe extension
  if [[ "$platform" == windows-* ]]; then
    output="${output}.exe"
  fi

  echo "Building for ${platform} (${target})..."
  bun build src/index.ts --compile --target="${target}" --outfile="${output}"
done

echo "Build complete."
ls -la dist/
