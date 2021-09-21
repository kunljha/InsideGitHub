import React, { Component } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'

class App extends Component {
	state = {
		users: [],
		loading: false,
	}

	async componentDidMount() {
		this.setState({ loading: true })

		const res = await fetch(
			`http://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		this.setState({ users: data, loading: false })
	}

	render() {
		const { users, loading } = this.state
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Search />
					<Users users={users} loading={loading} />
				</div>
			</div>
		)
	}
}

export default App
