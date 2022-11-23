import { FormGroup, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import styles from '../styles/Courses.module.css';

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
      ? router.push(`http://localhost:3000/enrollments?${params}`)
      : router.push(`http://localhost:3000/courses?${params}`)
  }

  return (
    <FormGroup>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ m: 1, width: '25ch' }}
        id="filled-search"
        label="By Course"
        type="search"
        variant="filled" />
      <TextField
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ m: 1, width: '25ch' }}
        id="filled-search"
        label="By Category"
        type="search"
        variant="filled" />
      <TextField
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        sx={{ m: 1, width: '25ch' }}
        id="filled-search"
        label="By Provider"
        type="search"
        variant="filled" />
      <Button onClick={newSearch} >Search</Button>
    </FormGroup>
  )
}

export default Search;