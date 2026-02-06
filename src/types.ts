export interface PullRequest {
  number: number
  state: 'OPEN' | 'CLOSED' | 'MERGED'
  merged: boolean
  additions: number
  deletions: number
  createdAt: string
  repository: {
    nameWithOwner: string
    owner: { login: string }
    stargazerCount: number
    isPrivate: boolean
  }
}

export interface Issue {
  number: number
  state: 'OPEN' | 'CLOSED'
  createdAt: string
  repository: {
    nameWithOwner: string
    owner: { login: string }
    stargazerCount: number
    isPrivate: boolean
  }
}

export interface RepoStats {
  repo: string
  stars: number
  opened: number
  merged?: number
  closed?: number
}

export interface PRStats {
  opened: number
  merged: number
  byRepo: RepoStats[]
}

export interface IssueStats {
  opened: number
  closed: number
  byRepo: RepoStats[]
}

export interface ContributionData {
  username: string
  currentRepo: string | null
  prs: PRStats
  issues: IssueStats
  reputation: number
  since: string | null
}

export interface Context {
  prAuthor: string | null
  currentRepo: string | null
}
