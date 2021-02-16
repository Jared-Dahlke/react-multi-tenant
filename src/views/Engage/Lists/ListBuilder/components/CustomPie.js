import React from 'react'
import { Pie } from 'react-chartjs-2'
import { accentColor } from '../../../../../assets/jss/colorContants'

const CustomPie = ({ data, title }) => {
	const chartData = {
		labels: [
			`Target (${data.legendData[0]})`,
			`Watch (${data.legendData[1]})`,
			`Block (${data.legendData[2]})`
		],
		datasets: [
			{
				data: data.data,
				//	backgroundColor: ['#aeef00', 'yellow', '#ef4100']
				backgroundColor: [accentColor, 'white', 'lightgrey']
				//	hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			}
		]
	}

	return (
		<div>
			<Pie
				data={chartData}
				options={{
					tooltips: {
						enabled: false
					},
					title: {
						display: true,
						text: title,
						fontFamily:
							"Apple-System, Arial, Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', STXihei, sans-serif",
						fontSize: 14,
						fontStyle: 'normal'
					},
					legend: {
						position: 'right'
					}
				}}
			/>
		</div>
	)
}

export default CustomPie
