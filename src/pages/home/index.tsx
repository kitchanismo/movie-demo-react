import { Typography } from '@material-ui/core'
import Movies from 'components/Movies'
import Search from 'components/Search'
import { MovieContext } from 'providers/MovieProvider'
import { useContext, useEffect, useState } from 'react'
import { search } from 'services/movieService'
import Pagination from '@material-ui/lab/Pagination'
import Box from '@material-ui/core/Box'
import { MovieDTO } from 'types/movieDTO'

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const [movieState, movieDispatch] = useContext(MovieContext)!
  const [hadSearch, setHadSearch] = useState(false)

  const handleSearchMovies = (query: string, page: number) => {
    search(query, page).then((data: MovieDTO) => {
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
      <Movies movies={movieState?.data?.results} />
      <Box display='flex' justifyContent='center'>
        <Pagination
          page={movieState?.data?.page}
          count={movieState?.data?.total_pages}
          variant='outlined'
          color='primary'
          onChange={(e, page) => handleSearchMovies(movieState.query, page)}
        />
      </Box>
    </>
  )
}

export default Home
