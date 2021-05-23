import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import { useContext, useState } from 'react'
import { MovieContext } from 'providers/MovieProvider'

export interface SearchProps {
  onSubmit: () => void
}

const Search: React.SFC<SearchProps> = ({ onSubmit }) => {
  const [movieState, movieDispatch] = useContext(MovieContext)!

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel htmlFor='outlined-search'>Search</InputLabel>
      <OutlinedInput
        id='outlined-search'
        value={movieState?.query}
        onChange={(e) =>
          movieDispatch({ type: 'ON_SET_QUERY', payload: e.target.value })
        }
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={() => onSubmit()} edge='end'>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={55}
        fullWidth
      />
    </FormControl>
  )
}

export default Search
