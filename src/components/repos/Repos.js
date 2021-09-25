import React, { Fragment, useContext } from 'react'
import RepoItem from './RepoItem'
import GithubContext from '../../context/github/githubContext'

const Repos = () => {
	const githubContext = useContext(GithubContext)
	const { repos } = githubContext

	return (
		<Fragment>
			{repos.map((repo) => {
				return <RepoItem key={repo.id} repo={repo} />
			})}
		</Fragment>
	)
}

export default Repos
