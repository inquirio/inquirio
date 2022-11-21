import prisma from '../../prisma/index'


export default async function handler(req, res){
  if(req.method === 'GET'){
    try {
      const result = await prisma.course.findMany();
      res.send(result)
      return {
        props: {
          allCourses: result
        }
      }
    } catch(e) {
      console.log(e);
    }
  }
  
}