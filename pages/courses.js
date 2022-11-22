
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Pagination } from '@mui/material';

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

  // {course.url}
  return (

    <>
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
      {data.totalPages && <Pagination onChange={(e, value) => setPage(value)} count={data.totalPages} />}

    </>

  )
}
