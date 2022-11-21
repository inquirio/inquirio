import prisma from '../../prisma/index'


export default async function handler(req, res){
  if(req.method === 'GET'){
    try {
      const allCourses = await prisma.course.findMany();
      res.send(allCourses)
      console.log('allCourses -------->', allCourses)
      return {
        data: {
          allCourses: allCourses
        }
      }
    } catch(e) {
      console.log(e);
    }
  }  
}