const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { 
      //  '@base-color': 'white', 
        '@primary-color': 'yellow',
        
        '@dropdown-bg': '#2d2d2d',
       
        '@input-bg': '#2d2d2d',
        '@input-color': '#FFF',
        '@picker-select-menu-item-selected-bg': '#2d2d2d',
        //'@picker-tree-node-active-color': 'purple',
       // '@picker-select-menu-item-selected-bg' : 'pink',
        //'@picker-tree-node-active-bg': 'yellow'
       // '@picker-select-menu-item-selected-color': 'yellow',
        '@picker-select-item-color': '#FFF',
        '@picker-menu-item-hover-bg': '#2d2d2d',
        '@text-color': '#FFF',
        '@font-family-base': '"Roboto", "Helvetica", "Arial", sans-serif',
        '@font-size-base' : '16px'
      }
    }
  })
);
