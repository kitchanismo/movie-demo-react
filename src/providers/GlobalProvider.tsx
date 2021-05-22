import { ThemeProvider } from '@material-ui/core/styles'
import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { produce } from 'immer'

export const GlobalContext =
  createContext<[state: GlobalState, dispatch: Dispatch<GlobalAction>] | null>(
    null
  )

interface GlobalState {
  isDark: boolean
  isLoading: boolean
}

type GlobalAction =
  | { type: 'HIDE_ALERT' | 'TOGGLE_THEME' }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_THEME'; payload: boolean }

const reducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    case 'TOGGLE_THEME':
      state.isDark = !state.isDark
      break
    case 'SET_THEME':
      state.isDark = action.payload
      break
    default:
      return state
  }
  return state
}

const GlobalProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    isDark: true,
    isLoading: false,
  })

  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 30,
          paddingTop: 15,
          paddingBottom: 15,
        },
      },
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: state.isDark ? '#303030' : '#fafafa',
          },
        },
      },
    },
    typography: {
      fontFamily: ['Arial'].join(','),
    },

    palette: {
      type: state.isDark ? 'dark' : 'light',
      primary: {
        main: '#9C27B0',
      },
      secondary: {
        main: '#E91E63',
      },
    },
  })

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    dispatch({ type: 'SET_THEME', payload: theme === 'dark' ? true : false })
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider value={[state, dispatch]}>
          {props.children}
        </GlobalContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default GlobalProvider
