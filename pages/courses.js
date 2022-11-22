
import { useState, useEffect } from 'react'
// import Category from '../Components/Category/category';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea, CardActions, Pagination } from '@mui/material';
import { FormGroup, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box'
import styles from '../styles/Courses.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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

    <Box className={styles.parentBox}>
      <FormGroup
        className={styles.searchForm}
      >
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          fullWidth sx={{ m: 1 }}
          id="filled-search"
          label="By Course"
          type="search"
          variant="filled" />
        <TextField
          onChange={(e) => setCategory(e.target.value)}
          fullWidth sx={{ m: 1 }}
          id="filled-search"
          label="By Category"
          type="search"
          variant="filled" />
        <TextField
          onChange={(e) => setProvider(e.target.value)}
          fullWidth sx={{ m: 1 }}
          id="filled-search"
          label="By Provider"
          type="search"
          variant="filled" />
        <Button
          className={styles.formButton}
          onClick={dbQuery}
          variant="outlined"
          startIcon={<SearchIcon />}
        > Search</Button>
      </FormGroup>
      <Grid
        container spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 16, md: 20 }}
        sx={{
          margin: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%'
        }}
      >
        {
          data.courses && data.courses.map((course, index) => (
            <Grid
              component="div"
              item xs={2} sm={4} md={4}
            >
              <Card
                className={styles.card}
                key={`course-${index}`}
                sx={{
                  height: '35vh',
                }}
              >
                <CardActionArea href={course.url} >
                  <CardMedia
                    className={styles.cardImg}
                    component="img"
                    image={course.image}
                    alt={course.name}
                  />
                  <CardContent className={styles.cardBody}>
                    <Typography
                      className={styles.cardHeader}
                      component="div">
                      {course.name}
                    </Typography>
                    <Typography
                      className={styles.cardText}
                      variant="body2"
                      color="text.secondary"
                    >
                      {course.provider}
                    </Typography>
                  </CardContent>

                  <CardContent className={styles.cardFoot} >
                    <CardActions >
                      <IconButton
                        className={styles.heartButton}
                        aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        {data.totalPages &&
          <Pagination
            className={styles.Pagination}
            size="large"
            color="primary"
            variant="outlined" 
            shape="rounded"
            onChange={(e, value) => setPage(value)}
            count={data.totalPages}
          />}
      </Grid>
    </Box>


  )

}


