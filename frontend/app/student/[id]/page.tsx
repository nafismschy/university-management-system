import axios from "axios";

interface Course {
    courseId: number;
    courseName: string;
    department: string;
    credit: number;
}

function CoursesList({ courses }: { courses: Course[] }) {
    return (
      <div>
        {courses.map(course => (
          <div key={course.courseId}>
            <p>Course ID: {course.courseId}</p>
            <p>Course Name: {course.courseName}</p>
            <p>Department: {course.department}</p>
            <p>Credit: {course.credit}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  }

export default async function Courses({params}: {params: {id:string}}) {
    
    const id = params.id;
    const response = await axios.get(`http://localhost:4000/student/courses/${id}`);
    const courses = response.data[0].__courses__;
    
    return (
        <div>
            <h1>Courses</h1><hr />
            <CoursesList courses={courses} />
        </div>
    ); 
} 