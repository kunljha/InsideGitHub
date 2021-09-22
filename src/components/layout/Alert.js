const Alert = ({ alert }) => {
	return (
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle' />
				{alert.messg}
			</div>
		)
	)
}

export default Alert
