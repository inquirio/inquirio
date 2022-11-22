import { Box, Card, CardActions, CardActionArea, CardContent, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import getCourses from '../lib/courses';
import Search from '../Components/Search/Search';
import styles from '../styles/Courses.module.css';

export async function getServerSideProps({ query }) {
  let data = await getCourses(query)
  data.query = query
  return { props: { data } }
}

export default function Courses({ data }) {
  const router = useRouter();
  const setPage = value => {
    const params = new URLSearchParams(Object.entries({ ...data.query, page: value })).toString()
    router.push(`http://localhost:3000/courses?${params}`)
  }

  return (
    <Box className={styles.parentBox}>
      <Search enrollment={false} />
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
              key={`course-${index}`}
              component="div"
              item xs={2} sm={4} md={4}
            >
              <Card
                className={styles.card}
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
            onChange={(e, value) => setPage(value)}
            page={parseInt(data.query.page)}
            count={data.totalPages}
            className={styles.Pagination}
            size="large"
            color="primary"
            variant="outlined"
            shape="rounded"
          />}
      </Grid>
    </Box>
  )
}


