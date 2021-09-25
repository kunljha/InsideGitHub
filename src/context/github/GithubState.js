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

	// get user

	// get user repos

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
			}}
		>
			{props.children}
		</GithubContext.Provider>
	)
}

export default GithubState
