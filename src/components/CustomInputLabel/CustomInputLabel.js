import React from 'react'

export default function CustomInputLabel(props) {
	return (
		<div
			className='input-label'
			style={{
				color: props.color ? props.color : '#AAAAAA',
				fontSize: '14px',
				fontWeight: 400,
				lineHeight: 1.42857
			}}
		>
			{props.label}
		</div>
	)
}
