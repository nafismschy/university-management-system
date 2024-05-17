"use client";
import AuthGuard from "@/components/AuthGuard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [section, setSection] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("access_token");
        if (user_id) {
          const response = await axios.get(
            "http://localhost:3000/faculty/" + user_id + "/sections",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSection(response.data[0]);
          console.log(response.data[0]);
        } else {
          router.push("/faculty/login");
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
        router.push("/faculty/login");
      }
    };

    fetchSectionData();
  }, [router]);

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* @ts-ignore */}
        {section && section.sections.map((sec) => (
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Section ID
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {sec.id}
            </dd>
            <dt className="truncate text-sm font-medium text-gray-500">
              Section Name
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
              {sec.sectionName}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
