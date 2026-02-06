import { $ } from 'bun'
import type { Context, PullRequest, Issue } from './types'

const PAGES = 4

export async function getContext(): Promise<Context> {
  try {
    const result = await $`gh pr view --json author,headRepository`.json()
    return {
      prAuthor: result.author?.login ?? null,
      currentRepo: result.headRepository?.nameWithOwner ?? null
    }
  } catch {
    try {
      const repo = await $`gh repo view --json nameWithOwner`.json()
      return { prAuthor: null, currentRepo: repo.nameWithOwner }
    } catch {
      return { prAuthor: null, currentRepo: null }
    }
  }
}

export async function validateUser(login: string): Promise<boolean> {
  try {
    await $`gh api users/${login}`.quiet()
    return true
  } catch {
    return false
  }
}

export async function fetchPRs(username: string): Promise<PullRequest[]> {
  const query = `query($q: String!, $cursor: String) {
    search(query: $q, type: ISSUE, first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges { node { __typename ... on PullRequest {
        number state merged additions deletions createdAt
        repository { nameWithOwner owner { login } stargazerCount isPrivate }
      }}}
    }
  }`

  const results: PullRequest[] = []
  let cursor: string | null = null

  for (let i = 0; i < PAGES; i++) {
    const cmd = cursor
      ? $`gh api graphql -f query=${query} -f q=${'author:' + username + ' is:pr -is:draft'} -f cursor=${cursor}`
      : $`gh api graphql -f query=${query} -f q=${'author:' + username + ' is:pr -is:draft'}`

    const data: any = await cmd.json()
    const edges = data.data.search.edges
    results.push(...edges.map((e: any) => e.node).filter((n: any) => n.__typename === 'PullRequest' && !n.repository.isPrivate))

    if (!data.data.search.pageInfo.hasNextPage) break
    cursor = data.data.search.pageInfo.endCursor
  }

  return results
}

export async function fetchIssues(username: string): Promise<Issue[]> {
  const query = `query($q: String!, $cursor: String) {
    search(query: $q, type: ISSUE, first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges { node { __typename ... on Issue {
        number state createdAt
        repository { nameWithOwner owner { login } stargazerCount isPrivate }
      }}}
    }
  }`

  const results: Issue[] = []
  let cursor: string | null = null

  for (let i = 0; i < PAGES; i++) {
    const cmd = cursor
      ? $`gh api graphql -f query=${query} -f q=${'author:' + username + ' is:issue'} -f cursor=${cursor}`
      : $`gh api graphql -f query=${query} -f q=${'author:' + username + ' is:issue'}`

    const data: any = await cmd.json()
    const edges = data.data.search.edges
    results.push(...edges.map((e: any) => e.node).filter((n: any) => n.__typename === 'Issue' && !n.repository.isPrivate))

    if (!data.data.search.pageInfo.hasNextPage) break
    cursor = data.data.search.pageInfo.endCursor
  }

  return results
}
