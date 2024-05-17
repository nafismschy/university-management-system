import axios from "axios";
import Link from "next/link";

export default async function Page() {
    const response = await axios.get(`http://localhost:3000/article`);
    const articles = response.data;
    return (
      <div className="flex flex-col">
        {
          //@ts-ignore
          articles.map((article) => (
            <Link className="bg-slate-300 rounded-xl my-3" href={`/article/${article.id}`}>{article.title} | {article.datePublished}</Link>
          ))
        }
      </div>
    );
  }