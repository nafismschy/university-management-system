"use client"
import React, { useEffect, useState } from 'react';
import Session from '@/app/components/session';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface Assignment {
    assignmentId: number;
    title: string;
    uploadedDate: string;
}

export default async function Curriculum() {
    const router = useRouter();
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [deleteTerm, setdeleteTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/student/assignment/all`);
                const assignmentData = response.data || [];
                console.log(assignmentData);
                setAssignments(assignmentData);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (searchTerm: string) => {
        setSearchInput(searchTerm);
        try {
            const response = await axios.get(`http://localhost:4000/student/assignment/${searchTerm}`);
            const assignmentData = response.data || [];
            console.log(assignmentData);
            setAssignment(assignmentData);
        } catch (error) {
            console.error('Error searching assignments:', error);
        }
    };

    const handleDelete = async (deleteTerm: string) => {
        setdeleteTerm(deleteTerm);
        try {
            const response = await axios.delete(`http://localhost:4000/student/assignment/delete/${deleteTerm}`);
            toast.success('Delete Successful');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting assignments:', error);
        }
    };
    const handleCreateAssignment = () => {
        router.push('student/createassignment');
    };

    return (
        <>
            <Toaster />
            <Session />
            <div className="p-4 sm:ml-64 my-8">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 my-8">
                    <div className="relative overflow-x-auto">
                        <div className="flex justify-center items-center max-w-md mx-auto">
                            <Link href="/student/createassignment" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Add Assignment
                            </Link>
                        </div>
                        <div className="max-w-md mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" value={searchInput} onChange={(e) => handleSearch(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Assignment ID" required />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Assignment ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Uploaded Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput === '' ? (
                                    assignments.map((assignment: Assignment) => (
                                        <tr key={assignment.assignmentId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {assignment.assignmentId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {assignment.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {assignment.uploadedDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button value={assignment.assignmentId} onClick={(e) => handleDelete(e.currentTarget.value)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {assignment?.assignmentId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {assignment?.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {assignment?.uploadedDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button value={assignment?.assignmentId} onClick={(e) => handleDelete(e.currentTarget.value)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                    </td>
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
