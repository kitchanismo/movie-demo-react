import React, { useContext, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from 'components/layout'

import { GlobalContext } from 'providers/GlobalProvider'

const App: React.FC = (props) => {
  const [state, dispatch] = useContext(GlobalContext)!

  return (
    <>
      <CssBaseline />
      <Layout />
    </>
  )
}

export default App
