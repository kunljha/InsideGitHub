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
											<Users />
										</Fragment>
									)
								}}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/users/:login'
								render={(props) => {
									return <User {...props} />
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
