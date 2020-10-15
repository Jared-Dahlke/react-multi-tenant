const { override, addLessLoader } = require('customize-cra')

const blackColor = '#2d2d2d'

module.exports = override(
	addLessLoader({
		// If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: {
				'@base-color': '#00aeef',
				//	'@primary-color': 'yellow',

				'@dropdown-bg': blackColor,

				'@input-bg': blackColor,
				'@input-color': '#FFF',
				'@picker-select-menu-item-selected-bg': blackColor,
				//'@picker-tree-node-active-color': 'purple',
				// '@picker-select-menu-item-selected-bg' : 'pink',
				//'@picker-tree-node-active-bg': 'yellow'
				// '@picker-select-menu-item-selected-color': 'yellow',
				'@picker-select-item-color': '#FFF',
				'@picker-menu-item-hover-bg': blackColor,
				'@picker-tree-node-hover-bg': blackColor,
				'@text-color': '#FFF',
				'@font-family-base': '"Roboto", "Helvetica", "Arial", sans-serif',
				'@font-size-base': '16px',
				'@input-bg-disabled': blackColor,

				//navbar
				'@nav-bar-default-bg': blackColor,
				'@nav-bar-default-active-color': 'yellow',
				'@nav-bar-default-font-color': '#FFF',
				'@nav-bar-default-active-bg': blackColor,
				'@nav-item-default-hover-bg': blackColor,
				'@dropdown-link-hover-bg': blackColor,

				'@btn-default-hover-bg': 'yellow',
				'@btn-default-active-bg': 'purple',
				'@btn-default-focus-bg': 'pink',
				'@nav-subtle-hover-bg': 'red',
				//	'@nav-bar-subtle-hover-bg': 'green',
				'@btn-subtle-hover-bg': blackColor,
				'@btn-subtle-focus-bg': blackColor,
				//'@btn-subtle-active-color': blackColor,
				//'@btn-subtle-active-default-color': blackColor,
				'@btn-subtle-active-default-bg': blackColor
			}
		}
	})
)
