import { Box, Card, CardHeader, CardActions, CardContent, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useRouter } from 'next/router';
import Search from '../Components/Search/Search';
import styles from '../styles/Courses.module.css';
import { getEnrollment } from '../lib/enrollment';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Navbar from '../Components/Navbar/navbar';
import { useUser } from '@auth0/nextjs-auth0';
import nextConfig from '../next.config'


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

  const { user } = useUser();
  const router = useRouter();
  const setPage = value => {
    const params = new URLSearchParams(Object.entries({ ...data.query, page: value })).toString()
    router.push(`${nextConfig.env.host}/enrollments?${params}`)
  }
  const updateStatus = async (id, status) => {
    console.log(id, status);
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
    <>

      <Navbar />

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
            data.courses && data.courses.map((enrollment, index) => (
              <Grid
                key={`enrolled-${index}`}
                component="div"
                item xs={2} sm={4} md={4}
              >
                <Card
                  className={styles.card}
                  sx={{ height: '35vh' }}
                >

                  <CardHeader
                    className={styles.cardHeader}
                    action={
                      <IconButton
                        className={styles.exitButton}
                        href={enrollment.Course.url}  >
                        <ExitToAppSharpIcon />
                      </IconButton>
                    }
                    subheader={enrollment.Course.name}
                  />

                  <CardMedia
                    className={styles.cardImg}
                    component="img"
                    image={enrollment.Course.image}
                    alt={enrollment.Course.name}
                  />

                  <CardContent className={styles.cardBody}>
                    <Typography
                      className={styles.cardContent}
                      component="div">
                      {enrollment.Course.provider}
                    </Typography>
                  </CardContent>

                  <CardActions className={styles.cardFoot} >
                    {
                      enrollment.status === 'Queued' ?
                        <IconButton
                          onClick={() => updateStatus(enrollment.id, 'InProgress')}
                          className={styles.queueButton}
                          aria-label="add to favorites">
                          <SkipNextIcon />
                        </IconButton> :
                        <IconButton
                          onClick={() => updateStatus(enrollment.id, 'Completed')}
                          className={styles.queueButton}
                          aria-label="add to favorites">
                          <CastForEducationIcon />
                        </IconButton>
                    }
                    <IconButton
                      onClick={() => removeEnrollment(enrollment.id)}
                      className={styles.deleteButton}
                      aria-label="add to favorites">
                      <DeleteForeverOutlinedIcon />
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
