/*eslint-disable no-restricted-globals*/
import React from 'react'
import Grid from '@material-ui/core/Grid'
import GridItem from '../components/Grid/GridItem.js'
import Button from 'rsuite/lib/Button'
import Iframe from 'react-iframe'
import { useHistory } from 'react-router-dom'
import { routes } from '../routes'

function HomePage(props) {
  let history = useHistory()

  const handleResearchClick = () => {
    let url = routes.app.discover.channelResearch.path
    history.push(url)
  }

  const handleBrandProfileClick = () => {
    let url = routes.app.settings.brandProfiles.path
    history.push(url)
  }

  const handleMeasureClick = () => {
    let url = routes.app.measure.path
    history.push(url)
  }

  return (

    <Grid container justify='center'>
      <GridItem xs={12} sm={12} md={12}>
        <h2>
          Welcome!
        </h2>
        <br />
        <h5>
          Based on your brand mentality, we have taken the following actions:
        </h5>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15px',
          marginBottom: '15px',
          color: 'white'
        }}>
          <Iframe url="https://platform.datorama.com/external/dashboard?embed=d18896f6-cbe3-4031-b11d-d35d74345d13"
            height="440px"
            width="100%"
            frameBorder="0"
            id="brandTable"
            display="initial"
            position="relative" />
        </div>
        <h5>
          Next Steps:
        </h5>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
          color: 'white'
        }}>
          <Button style={{
            width: '250px',
            margin: '10px'
          }} onClick={handleMeasureClick}>View outcome performance</Button>
          &nbsp;
          <Button style={{
            width: '250px',
            margin: '10px'
          }} onClick={handleResearchClick}>View additional trends</Button>
          &nbsp;
          <Button style={{
            width: '250px',
            margin: '10px'
          }} onClick={handleBrandProfileClick}>View brand mentality</Button>
        </div>
      </GridItem>
    </Grid >
  )
}

export default HomePage
