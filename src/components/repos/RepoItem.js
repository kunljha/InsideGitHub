import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {
	return (
		<div className='card'>
			<h3>{repo.name}</h3>
			<p style={{ fontSize: '0.8rem' }}>{repo.description}</p>
			<a href={repo.html_url} className='btn btn-sm btn-primary my'>
				Visit Repo
			</a>
		</div>
	)
}

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired,
}

export default RepoItem
