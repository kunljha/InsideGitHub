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
	// const [users, setUsers] = useState([])
	// const [user, setUser] = useState({})
	// const [repos, setRepos] = useState([])
	// const [loading, setLoading] = useState(false)
	// const [alert, setAlert] = useState(null)

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => {
									return (
										<Fragment>
											<Search />
											<Users />
										</Fragment>
									)
								}}
							/>
							<Route exact path='/about' component={About} />
							<Route exact path='/users/:login' component={User} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	)
}

export default App
