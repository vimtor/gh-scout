# gh-scout

GitHub CLI extension for checking a contributor's open source merge rate before reviewing their PR.

## Install

```bash
gh extension install vimtor/gh-scout
```

Requires [GitHub CLI](https://cli.github.com/) (`gh`) authenticated.

## Usage

```bash
gh scout <username>                  # Check user's merge rate
gh scout                             # In PR branch, check PR author
gh scout <username> --json           # JSON output
gh scout <username> --issues         # Include issues
gh scout <username> --repo org/name  # Highlight specific repo
```

## Example

<img src="example.png" alt="rauchg example output" width="70%" height="auto">

## Motivation

Many open source maintainers are complaining about the influx of low-quality PRs from external contributors due to the rise of agentic coding:

- [tldraw closing pull requests from external contributors](https://x.com/tldraw/status/2011911073834672138)
- [this tweet from @NathanFlurry](https://x.com/NathanFlurry/status/2018934424218587209)

## License

[MIT](LICENSE)
