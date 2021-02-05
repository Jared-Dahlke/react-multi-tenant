import React from 'react'

const FiltersLabel = (props) => {
	return (
		<div style={{ fontSize: 12, color: props.color ? props.color : 'white' }}>
			{props.text}
		</div>
	)
}

export default FiltersLabel
