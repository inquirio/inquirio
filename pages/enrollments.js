import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import Search from '../Components/Search/Search';
import { getEnrollment } from '../lib/enrollment';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const { user } = getSession(ctx.req, ctx.res)
    let data = await getEnrollment({ ...ctx.query, userId: user.dbid })
    data.query = ctx.query
    return { props: { data } }
  }
})


export default function Enrollments({ data }) {
  const router = useRouter();
  const setPage = value => {
    const params = new URLSearchParams(Object.entries({ ...data.query, page: value })).toString()
    router.push(`http://localhost:3000/enrollments?${params}`)
  }

  return (
    <>
      <Search enrollment={true} />
      {data.courses && data.courses.map((enrollment, index) => (
        <Card
          key={`course-${index}`}
          sx={{ maxWidth: 345 }}>
          <CardActionArea href={enrollment.Course.url} >
            <CardMedia
              component="img"
              height="140"
              image={enrollment.Course.image}
              alt={enrollment.Course.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {enrollment.Course.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      {data.totalPages && <Pagination
        onChange={(e, value) => setPage(value)}
        page={parseInt(data.query.page)}
        count={data.totalPages}
        variant="outlined"
      />}

    </>

  )
}
