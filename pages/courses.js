import Head from 'next/head';
import { Box, Card, CardActions, CardHeader, CardContent, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import getCourses from '../lib/courses';
import Search from '../Components/Search/Search';
import styles from '../styles/Courses.module.css';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import Navbar from '../Components/Navbar/navbar';
import nextConfig from '../next.config'

export async function getServerSideProps({ query }) {
  if (!query.page) query.page = 1
  let data = await getCourses(query)
  data.query = query
  return { props: { data } }
}

export default withPageAuthRequired(function Courses({ data }) {
  const { user } = useUser();

  const router = useRouter();
  const setPage = value => {
    const params = new URLSearchParams(Object.entries({ ...data.query, page: value })).toString()
    router.push(`${nextConfig.env.host}/courses?${params}`)
  }

  const enroll = async (courseId) => {
    const res = await fetch('/api/enrollment', {
      method: 'POST',
      body: JSON.stringify({
        courseId,
        userId: user.dbid
      })
    })
  }

  return (

    <>
      <Head>
        <title>inquirio</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
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
                  sx={{ height: '40vh' }}
                >

                  <CardHeader
                    className={styles.cardHeader}
                    action={
                      <IconButton
                        className={styles.exitButton}
                        href={course.url}  >
                        <ExitToAppSharpIcon />
                      </IconButton>
                    }
                    subheader={course.name}
                  />

                  <CardMedia
                    className={styles.cardImg}
                    component="img"
                    image={course.image}
                    alt={course.name}
                  />

                  <CardContent className={styles.cardBody}>
                    <Typography
                      className={styles.cardContent}
                      component="div">
                      {course.provider}

                    </Typography>
                  </CardContent>

                  <CardActions className={styles.cardFoot} >
                    <IconButton
                      onClick={() => enroll(course.id)}
                      className={styles.heartButton}
                      aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>

                </Card>
              </Grid>
            ))}
          {data.totalPages &&
            <Pagination
              onChange={(e, value) => setPage(value)}
              page={parseInt(data.query.page)}
              count={parseInt(data.totalPages)}
              className={styles.Pagination}
              size="large"
              color="primary"
              variant="outlined"
              shape="rounded"
            />}
        </Grid>
      </Box>
    </>
  )
})
