"use client"
import React, { useEffect, useState } from 'react';
import Session from '@/app/components/session';
import axios from 'axios';

interface Course {
    courseId: number;
    courseName: string;
    department: string;
    credit: number;
}

export default async function Home() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                if (user_id) {
                    const response = await axios.get(`http://localhost:4000/student/courses/${user_id}`);
                    const coursesData = response.data[0]?.__courses__ || [];
                    setCourses(coursesData);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Session />
            <div className="p-4 sm:ml-64 my-8">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 my-8">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Course ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Course Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Credit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course: Course) => (
                                    <tr key={course.courseId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {course.courseId}
                                        </th>
                                        <td className="px-6 py-4">
                                            {course.courseName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {course.department}
                                        </td>
                                        <td className="px-6 py-4">
                                            {course.credit}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>
        </>
    )
}
