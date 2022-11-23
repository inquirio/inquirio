import { FormGroup, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import nextConfig from '../../next.config'

const Search = ({ enrollment }) => {
  const router = useRouter();
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [provider, setProvider] = useState('')

  const newSearch = () => {
    const query = [['page', 1]]
    if (provider) query.unshift(['provider', provider])
    if (category) query.unshift(['category', category])
    if (search) query.unshift(['search', search])
    const params = new URLSearchParams(query).toString()
    enrollment
      ? router.push(`${nextConfig.env.host}/enrollments?${params}`)
      : router.push(`${nextConfig.env.host}/courses?${params}`)
  }

  return (
    <FormGroup
      sx={{
        mb: '3.5vh',
        display: 'inline-flex',
        width: '50%',
        justifyContent: 'center'
      }}>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ m: 1 }}
        id="filled-search"
        label="By Course"
        type="search"
        variant="filled" />
      <TextField
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ m: 1 }}
        id="filled-search"
        label="By Category"
        type="search"
        variant="filled" />
      <TextField
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        sx={{ m: 1 }}
        id="filled-search"
        label="By Provider"
        type="search"
        variant="filled" />
      <Button
        onClick={newSearch}
        startIcon={<SearchIcon />}
      >Search</Button>
    </FormGroup>
  )
}

export default Search;
