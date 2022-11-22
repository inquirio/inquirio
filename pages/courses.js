import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import getCourses from '../lib/courses';
import Search from '../Components/Search/Search';

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
    <>
      <Search enrollment={false} />
      {data.courses && data.courses.map((course, index) => (
        <Card
          key={`course-${index}`}
          sx={{ maxWidth: 345 }}>
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
