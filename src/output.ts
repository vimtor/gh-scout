import pc from 'picocolors'
import type { ContributionData } from './types'

function colorRate(rate: number): string {
  if (rate >= 70) return pc.green(`${rate}%`)
  if (rate >= 40) return pc.yellow(`${rate}%`)
  return pc.red(`${rate}%`)
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function formatPretty(data: ContributionData): string {
  const { username, currentRepo, prs, issues, reputation, since } = data
  const mergeRate = prs.opened > 0 ? Math.round((prs.merged / prs.opened) * 100) : 0
  const closeRate = issues.opened > 0 ? Math.round((issues.closed / issues.opened) * 100) : 0

  let output = `${pc.bold(pc.cyan(username))}${since ? pc.dim(` (from ${formatDate(since)})`) : ''}

${pc.bold('Reputation:')} ${colorRate(reputation)} ${pc.dim(`(% of merged stars)`)}

${pc.bold('Pull Requests:')}
${prs.merged} merged ${prs.opened} opened ${colorRate(mergeRate)}`

  for (const repo of prs.byRepo) {
    const rate = repo.opened > 0 ? Math.round((repo.merged! / repo.opened) * 100) : 0
    const repoName = repo.repo === currentRepo ? pc.cyan(repo.repo) : pc.dim(repo.repo)
    output += `\n${repoName} ${repo.merged}/${repo.opened} ${colorRate(rate)}`
  }

  if (issues.opened > 0) {
    output += `

${pc.bold('Issues:')}
${issues.closed} closed ${issues.opened} opened ${colorRate(closeRate)}`

    for (const repo of issues.byRepo) {
      const rate = repo.opened > 0 ? Math.round((repo.closed! / repo.opened) * 100) : 0
      const repoName = repo.repo === currentRepo ? pc.cyan(repo.repo) : pc.dim(repo.repo)
      output += `\n${repoName} ${repo.closed}/${repo.opened} ${colorRate(rate)}`
    }
  }

  return output
}

export function formatJSON(data: ContributionData): string {
  return JSON.stringify(data, null, 2)
}
