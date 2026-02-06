<div align='center'>
    <br/>
    <br/>
    <h3>mergerep</h3>
    <p>CLI for open-source contribution stats</p>
    <br/>
    <br/>
</div>

Shows how often a user's PRs get merged into open source repos, weighted by repo stars.

## Install

```bash
bun install -g mergerep
```

Requires [Bun](https://bun.sh/) and [GitHub CLI](https://cli.github.com/) authenticated: `gh auth login`

## Usage

```bash
mergerep <username>              # Check user's merge rate
mergerep                         # In PR branch, check PR author
mergerep <username> --json       # JSON output
mergerep <username> --issues     # Include issues
mergerep <username> --repo org/name  # Highlight specific repo
```

## Output

- **Reputation**: Star-weighted merge rate — % of total PR stars that were merged (0-100)
- **Pull Requests**: Opened, merged, merge rate, per-repo breakdown
- **Issues**: Opened, closed, close rate (with `--issues`)

## License

[MIT](LICENSE)
