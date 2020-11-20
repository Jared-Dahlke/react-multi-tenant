/*eslint-disable no-restricted-globals*/
import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../components/Grid/GridItem.js'
import Iframe from 'react-iframe'

function MeasurePage(props) {

    return (

        <Grid container justify='center'>
            <GridItem xs={12} sm={12} md={12}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white'
                }}>
                    <Iframe url="https://platform.datorama.com/external/dashboard?embedpage=da910c88-f2f8-45c7-944b-938fe7fc8887"
                        height="600px"
                        width="100%"
                        frameBorder="0"
                        id="brandTable"
                        display="initial"
                        position="relative" />
                </div>
            </GridItem>
        </Grid >
    )
}

export default MeasurePage
