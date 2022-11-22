
import { useState, useEffect } from 'react'
// import Category from '../Components/Category/category';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea, Pagination } from '@mui/material';
import { FormGroup, TextField, Button } from '@mui/material';
export default function Courses() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [provider, setProvider] = useState('');

  const dbQuery = async () => {
    const params = new URLSearchParams(Object.entries({
      page,
      search,
      category,
      provider
    })).toString()
    fetch(`/api/courses?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }

  useEffect(() => {
    dbQuery()
  }, [page])

  return (
    <>
    
    <FormGroup >
        <TextField onChange={(e) => setSearch(e.target.value)} id="filled-basic" label="By Course" variant="filled" />
        <TextField onChange={(e) => setCategory(e.target.value)} id="filled-basic" label="By Category" variant="filled" />
        <TextField onChange={(e) => setProvider(e.target.value)} id="filled-basic" label="By Provider" variant="filled" />
          <Button onClick={dbQuery} >Search</Button>
        </FormGroup>
      <Grid
        container spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 8, sm: 12, md: 16 }}
      >
        {
          data.courses && data.courses.map((course, index) => (
            <Grid item xs={2} sm={4} md={4} >
              <Card key={`course-${index}`} >
                <CardActionArea href={course.url} >
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.name}
                    </Typography>
                    <Typography gutterBottom component="div">
                      {course.provider}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        {data.totalPages && <Pagination onChange={(e, value) => setPage(value)} count={data.totalPages} />}
      </Grid>
    
    </>

  )

}


