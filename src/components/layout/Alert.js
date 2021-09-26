import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alert = () => {
	const alertContext = useContext(AlertContext)

	return (
		alertContext.alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle' />
				{alert.messg}
			</div>
		)
	)
}

export default Alert
