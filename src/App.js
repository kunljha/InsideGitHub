import React, { Fragment, Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	}

	// async componentDidMount() {
	// 	this.setState({ loading: true })

	// 	const res = await fetch(
	// 		`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	)
	// 	const data = await res.json()

	// 	this.setState({ users: data, loading: false })
	// }

	// fetching users from github api
	searchUsers = async (text) => {
		this.setState({ loading: true })

		const res = await fetch(
			`//api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		this.setState({ users: data.items, loading: false })
	}

	// fetching data of a single user
	getUser = async (username) => {
		this.setState({ loading: true })

		const res = await fetch(
			`//api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		this.setState({ user: data, loading: false })
	}

	// fetching repos of a user
	getUserRepos = async (username) => {
		this.setState({ loading: true })

		const res = await fetch(
			`//api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		this.setState({ repos: data, loading: false })
	}

	// clearing users from state
	clearUsers = () => {
		this.setState({ users: [], loading: false })
	}

	// alert to user
	setAlert = (messg, type) => {
		this.setState({
			alert: { messg, type },
		})

		setTimeout(() => {
			this.setState({ alert: null })
		}, 2500)
	}

	render() {
		const { users, user, repos, loading, alert } = this.state
		return (
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
												searchUsers={this.searchUsers}
												clearUsers={this.clearUsers}
												showClear={users.length > 0 ? true : false}
												setAlert={this.setAlert}
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
											getUser={this.getUser}
											getUserRepos={this.getUserRepos}
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
		)
	}
}

export default App
