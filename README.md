# mergerep

CLI for checking a contributor's merge rates before wasting time on low quality LLM pull request.

## Install

```bash
bun install -g mergerep
npm install -g mergerep
pnpm install -g mergerep
```

Requires [Bun](https://bun.sh/) and [GitHub CLI](https://cli.github.com/).

## Usage

```bash
mergerep <username>                  # Check user's merge rate
mergerep                             # In PR branch, check PR author
mergerep <username> --json           # JSON output
mergerep <username> --issues         # Include issues
mergerep <username> --repo org/name  # Highlight specific repo
```

## Example

<img src="example.png" alt="rauchg example output" width="70%" height="auto">

## Motivation

Given the rise of agentic coding, many open source mantainers have complained about the influx of low quality pull requests from external contributors:

- [tldraw closing pull requests from external contributors](https://x.com/tldraw/status/2011911073834672138)
- [@NathanFlurry's tweet](https://x.com/NathanFlurry/status/2018934424218587209)

## License

[MIT](LICENSE)
