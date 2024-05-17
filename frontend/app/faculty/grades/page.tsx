import GradeCard from "@/components/GradeCard";
import axios from "axios";

export default async function Page() {
  const response = await axios.get(`http://localhost:3000/grade`);
  const grades = response.data;
  return (
    <div className="flex flex-col">
      {
        //@ts-ignore
        grades.map((grade) => (
          <GradeCard grade={grade} key={grade.id}/>
          
        ))
      }
    </div>
  );
}
