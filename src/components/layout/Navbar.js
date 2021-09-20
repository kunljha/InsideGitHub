import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				{title}
			</h1>
		</nav>
	)
}

Navbar.defaultProps = {
	title: 'Inside GitHub',
	icon: 'fab fa-github',
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
}

// class Navbar extends Component {
// 	static defaultProps = {
// 		title: 'Inside GitHub',
// 		icon: 'fab fa-github',
// 	}

// 	static propTypes = {
// 		title: PropTypes.string.isRequired,
// 		icon: PropTypes.string.isRequired,
// 	}

// 	render() {
// 		const { title, icon } = this.props
// 		return (
// 			<nav className='navbar bg-primary'>
// 				<h1>
// 					<i className={icon} />
// 					{title}
// 				</h1>
// 			</nav>
// 		)
// 	}
// }

export default Navbar
