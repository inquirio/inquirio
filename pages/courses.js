
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Courses() {

  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        let sliceData = data.slice(0, 10)
        setData(sliceData)
        // setData(data)
      })
  }, [])

  return (

    <>
      {data.length && data.map((course, index) => (
        <Card
          key={`course-${index}`}
          sx={{ maxWidth: 345 }}>
          <CardActionArea>
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
    </>

  )
}
