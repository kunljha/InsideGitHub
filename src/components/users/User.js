import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'

class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login)
		this.props.getUserRepos(this.props.match.params.login)
	}

	static propTypes = {
		getUser: PropTypes.func.isRequired,
		getUserRepos: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		repos: PropTypes.array.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	render() {
		const {
			name,
			company,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		} = this.props.user

		const { repos, loading } = this.props

		return loading ? (
			<Spinner />
		) : (
			<Fragment>
				<Link to='/' className='btn btn-light'>
					Back To Search
				</Link>
				Hireable:{' '}
				{hireable ? (
					<i className='fas fa-check text-success' />
				) : (
					<i className='fas fa-times-circle text-danger' />
				)}
				<div className='card grid-2'>
					<div className='all-center'>
						<img
							src={avatar_url}
							alt='avatar_url'
							className='round-img'
							style={{ width: '150px' }}
						/>
						<h1>{name}</h1>
						<h4>Location: {location}</h4>
					</div>
					<div>
						{bio && (
							<Fragment>
								<h2 style={{ textDecorationLine: 'underline' }}>Bio</h2>
								<p>{bio}</p>
								<a href={html_url} className='btn btn-dark my-1'>
									Visit GitHub Profile
								</a>
							</Fragment>
						)}
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>Username: </strong>
										{login}
									</Fragment>
								)}
							</li>
							<li>
								{company && (
									<Fragment>
										<strong>Company: </strong>
										{company}
									</Fragment>
								)}
							</li>
							<li>
								{blog && (
									<Fragment>
										<strong>Website: </strong>
										<a href={blog}>{blog}</a>
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>
				<div className='card text-center'>
					<div className='badge badge-primary'>Followers: {followers}</div>
					<div className='badge badge-success'>Following: {following}</div>
					<div className='badge badge-light'>Public Repos: {public_repos}</div>
					<div className='badge badge-dark'>Public Gists: {public_gists}</div>
				</div>
				<Repos repos={repos} />
			</Fragment>
		)
	}
}

export default User
