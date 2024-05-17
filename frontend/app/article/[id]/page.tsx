import axios from "axios";
export default async function Page({ params }: { params: { id: string } }) {
  //   @ts-ignore
  const id = params.id;
  const response = await axios.get(`http://localhost:3000/article/${id}`);
  const article = response.data;

  return (
    <div className="relative px-6 lg:px-8">
      <div className="mx-auto max-w-prose text-lg">
        <h1>
          <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </span>
        </h1>
        <p className="mt-8 text-xl leading-8 text-gray-500 text-center">
          {article.datePublished}
        </p>

        <p className="mt-8 text-xl leading-8 text-gray-500 text-justify">
          {article.content}
        </p>
        
        <p className="mt-8 text-xl leading-8 text-gray-700">Tags</p>
        <span className="mt-8 text-xl leading-8 text-gray-400">
          {article.tags && article.tags.join(", ")}
        </span>
      </div>
    </div>
  );
}
