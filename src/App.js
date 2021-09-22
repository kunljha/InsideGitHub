import React, { Component } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'

class App extends Component {
	state = {
		users: [],
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

	// clearing users from state
	clearUsers = () => {
		this.setState({ users: [], loading: false })
	}

	// alert to user
	setAlert = (messg, type) => {
		this.setState({
			alert: { messg: messg, type: type },
		})

		setTimeout(() => {
			this.setState({ alert: null })
		}, 2500)
	}

	render() {
		const { users, loading, alert } = this.state
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0 ? true : false}
						setAlert={this.setAlert}
					/>
					<Users users={users} loading={loading} />
				</div>
			</div>
		)
	}
}

export default App
