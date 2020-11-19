/*eslint-disable no-restricted-globals*/
import React from 'react'
import Button from 'rsuite/lib/Button'
import { useHistory } from 'react-router-dom'
import { routes } from '../routes'

function HomePage(props) {
  let history = useHistory()

  const handleScenariosClick = () => {
    let url = routes.app.settings.brandProfiles.admin.scenarios.path
    history.push(url)
  }

  const handleOpinionsClick = () => {
    let url = routes.app.settings.brandProfiles.admin.opinions.path
    history.push(url)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 200px)'
      }}
    >
      <Button onClick={handleScenariosClick}>Configure Scenarios</Button>
			&nbsp;
      <Button onClick={handleOpinionsClick}>Configure Opinions</Button>
    </div>
  )
}

export default HomePage
