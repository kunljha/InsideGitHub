import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
	const [text, setText] = useState('')

	const githubContext = useContext(GithubContext) // initialising githubContext in Search component
	const alertContext = useContext(AlertContext) // initialising alertContext in Search component
	const { users, searchUsers, clearUsers } = githubContext

	const onChange = (e) => {
		setText(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (text) {
			searchUsers(text)
			setText('')
		} else {
			alertContext.showAlert('Please enter something!', 'light')
		}
	}

	return (
		<div>
			<form className='form' onSubmit={onSubmit}>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{users.length > 0 && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	)
}

export default Search
