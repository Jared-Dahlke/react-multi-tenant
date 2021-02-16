import React from 'react'
import Table from 'rsuite/lib/Table'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'
import Button from 'rsuite/lib/Button'
import './listbuilder.css'
const openInNewTab = (url) => {
	const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
	if (newWindow) newWindow.opener = null
}

export const NameCell = ({
	rowData,
	dataKey,
	displayProp,
	tooltipProp,
	tooltipPlacement,
	urlPrefix,
	...props
}) => {
	return (
		<Table.Cell
			{...props}
			className='link-group'
			style={{ align: 'center', padding: 5 }}
		>
			<Whisper
				placement={'bottom'}
				trigger='hover'
				speaker={<Tooltip>{rowData.nameTooltip}</Tooltip>}
			>
				<Button
					appearance='link'
					onClick={() => openInNewTab(`${urlPrefix}${rowData.id}`)}
					className={'lbTableFont'}
				>
					{rowData.nameDisplay}
				</Button>
			</Whisper>
		</Table.Cell>
	)
}
