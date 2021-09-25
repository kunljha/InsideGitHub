import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'

const App = () => {
	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(null)

	// fetching data of a single user
	const getUser = async (username) => {
		setLoading(true)

		const res = await fetch(
			`//api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		setUser(data)
		setLoading(false)
	}

	// fetching repos of a user
	const getUserRepos = async (username) => {
		setLoading(true)
		const res = await fetch(
			`//api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		setRepos(data)
		setLoading(false)
	}

	// clearing users from state
	const clearUsers = () => {
		setUsers([])
		setLoading(false)
	}

	// alert to user
	const showAlert = (messg, type) => {
		setAlert({ messg, type })

		setTimeout(() => {
			setAlert(null)
		}, 2500)
	}

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => {
									return (
										<Fragment>
											<Search
												clearUsers={clearUsers}
												showClear={users.length > 0 ? true : false}
												showAlert={showAlert}
											/>
											<Users users={users} loading={loading} />
										</Fragment>
									)
								}}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/users/:login'
								render={(props) => {
									return (
										<User
											{...props}
											getUser={getUser}
											getUserRepos={getUserRepos}
											user={user}
											repos={repos}
											loading={loading}
										/>
									)
								}}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	)
}

export default App
