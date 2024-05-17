"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

interface FormData {
  title: string;
  content: string;
}

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Please fill all credentials.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/article",
          {title: formData.title, content: formData.content, datePublished: new Date().toJSON().slice(0, 10)},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Post Successful");
      router.push("/article");
    } catch (error) {
      console.error("Error Posting:", error);
      toast.error("Post Failed");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Article
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Content
                </label>
                <input
                  id="content"
                  name="content"
                  type="content"
                  autoComplete="content"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
