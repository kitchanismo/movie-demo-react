import { Typography } from '@material-ui/core'
import Movies from 'components/Movies'
import Search from 'components/Search'
import { MovieContext } from 'providers/MovieProvider'
import { useContext, useEffect, useState } from 'react'
import { getPopular, search } from 'services/movieService'
import Pagination from '@material-ui/lab/Pagination'
import Box from '@material-ui/core/Box'
import { MovieDTO } from 'types/movieDTO'
import { GlobalContext } from 'providers/GlobalProvider'
import Scroll from 'react-scroll'

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const [movieState, movieDispatch] = useContext(MovieContext)!
  const [_, globalDispatch] = useContext(GlobalContext)!
  const [hadSearch, setHadSearch] = useState(false)
  const scroll = Scroll.animateScroll

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'MOVIES' })
    handleOnLoadPopularMovies(1)
  }, [])

  const handleOnLoadPopularMovies = (page: number) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getPopular(page).then((data: MovieDTO) => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      movieDispatch({
        type: 'ON_SET_MOVIES',
        payload: data,
      })
      setHadSearch(false)
    })
  }

  const handleSearchMovies = (query: string, page: number) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    search(query, page).then((data: MovieDTO) => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      movieDispatch({
        type: 'ON_SET_MOVIES',
        payload: data,
      })
      setHadSearch(true)
    })
  }

  return (
    <>
      <Search
        onSubmit={() =>
          handleSearchMovies(movieState.query, movieState?.data?.page)
        }
      />
      {hadSearch && (
        <Typography style={{ marginTop: 5 }} variant='body1'>
          Search results: {movieState?.data?.total_results}
        </Typography>
      )}
      {!hadSearch && (
        <Typography style={{ marginTop: 5 }} variant='body1'>
          Popular Movies
        </Typography>
      )}
      <Movies movies={movieState?.data?.results} />

      <Box display='flex' justifyContent='center'>
        <Pagination
          page={movieState?.data?.page}
          count={movieState?.data?.total_pages}
          variant='outlined'
          color='primary'
          onChange={(e, page) => {
            scroll.scrollToTop({ duration: 1000 })
            if (movieState.query) {
              handleSearchMovies(movieState.query, page)
              return
            }
            handleOnLoadPopularMovies(page)
          }}
        />
      </Box>
    </>
  )
}

export default Home
