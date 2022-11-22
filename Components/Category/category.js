import { FormGroup, TextField, Button } from '@mui/material';
import courses from '../../pages/courses'
import { useState, useEffect } from 'react';
const Category = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <form>
        <FormGroup>
        <TextField id="filled-basic" label="Search Category" variant="filled" />
          <Button>Search</Button>
        </FormGroup>
      </form>
    </>
  )
}

export default Category;
