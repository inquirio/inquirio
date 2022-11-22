import { FormGroup, TextField, Button } from '@mui/material';


const Category = () => {


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
