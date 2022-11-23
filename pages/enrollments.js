import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useRouter } from 'next/router';
import Search from '../Components/Search/Search';
import styles from '../styles/Courses.module.css';
import { getEnrollment} from '../lib/enrollment';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { user } = getSession(ctx.req, ctx.res)
    let data = await getEnrollment({ ...ctx.query, userId: user.dbid })
    data.query = ctx.query
    if (!data.query.page) data.query.page = 1
    return { props: { data } }
  }
})

export default withPageAuthRequired(function Enrollments({ data }) {
  const router = useRouter();
  const setPage = value => {
    const params = new URLSearchParams(Object.entries({ ...data.query, page: value })).toString()
    router.push(`http://localhost:3000/enrollments?${params}`)
  }
  const updateStatus = async (id, status) => {
    const res = await fetch('/api/enrollment', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        status
      })
    })
  }
  
  const removeEnrollment = async (id) => {
    const res = await fetch('/api/enrollment', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
  }

  return (
    <Box className={styles.parentBox}>
      <Search enrollment={true} />
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
                key={`course-${index}`}
                className={styles.card}
                sx={{height: '35vh'}}
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
                      // onClick={() => updateEnrollment(course.id)}
                      className={styles.queueButton}
                      aria-label="add to favorites">
                      <SkipNextIcon />
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
  )
})
