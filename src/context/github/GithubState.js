import React, { useReducer } from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
	SEARCH_USERS,
	GET_USER,
	GET_REPOS,
	CLEAR_USERS,
	SET_LOADING,
} from '../types'

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(GithubReducer, initialState)

	// fetching users from github api
	const searchUsers = async (text) => {
		setLoading()

		const res = await fetch(
			`//api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		dispatch({
			type: SEARCH_USERS,
			payload: data.items,
		})
	}

	// fetching data of a single user
	const getUser = async (username) => {
		setLoading()

		const res = await fetch(
			`//api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		dispatch({
			type: GET_USER,
			payload: data,
		})
	}

	// fetching repos of a user
	const getUserRepos = async (username) => {
		setLoading()
		const res = await fetch(
			`//api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		)
		const data = await res.json()

		dispatch({
			type: GET_REPOS,
			payload: data,
		})
	}

	// clear users

	// set loading
	const setLoading = () => {
		dispatch({ type: SET_LOADING })
	}

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	)
}

export default GithubState
