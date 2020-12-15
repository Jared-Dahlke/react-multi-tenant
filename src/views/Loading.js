/*eslint-disable no-restricted-globals*/
import React from 'react'
import Loader from 'rsuite/lib/Loader'
import makeStyles from '@material-ui/core/styles/makeStyles'
import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js'

const useStyles = makeStyles(styles)
function Loading(props) {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}	style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
      }}>
      <Loader size='sm' content='Loading...!'/>
    </div>
  )
}

export default Loading
