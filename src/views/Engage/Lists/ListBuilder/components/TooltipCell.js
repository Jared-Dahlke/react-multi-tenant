import React from 'react'
import Table from 'rsuite/lib/Table'
import Whisper from 'rsuite/lib/Whisper'
import Tooltip from 'rsuite/lib/Tooltip'

export const TooltipCell = ({
	rowData,
	dataKey,
	displayProp,
	tooltipProp,
	tooltipPlacement,
	...props
}) => {
	return (
		<Table.Cell {...props} className='link-group'>
			<Whisper
				placement={tooltipPlacement ? tooltipPlacement : 'bottom'}
				trigger='hover'
				speaker={<Tooltip>{rowData[tooltipProp]}</Tooltip>}
			>
				<div>{rowData[displayProp]}</div>
			</Whisper>
		</Table.Cell>
	)
}
