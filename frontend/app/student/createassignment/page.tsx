"use client"
import React, { useEffect, useState } from 'react';
import Session from '@/app/components/session';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from "next/link";

interface FormData {
    title: string;
    uploadedDate: string;
    assignmentFile: File | null;
}

export default async function Curriculum() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        uploadedDate: '',
        assignmentFile: null,
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formDataObject = new FormData();
                formDataObject.append('title', formData.title);
                formDataObject.append('uploadedDate', formData.uploadedDate);
                if (formData.assignmentFile) {
                    formDataObject.append('assignmentFile', formData.assignmentFile);
                }
                console.log(formDataObject);
                const response = await axios.post('http://localhost:4000/student/assignment/create', formDataObject);

                toast.success('Assignment added successful!');
                router.push('/student/assignment');

            } catch (error) {
                console.error('Error during adding assignment:', error);
                toast.error('Assignment adding failed. Please try again.');
            }
        } else {
            setErrors(validationErrors);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        if (name === 'assignmentFile') {
            setFormData({ ...formData, [name]: files ? files[0] : null });
            setErrors({ ...errors, [name]: null });
        } else {
            setFormData({ ...formData, [name]: value });
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = (formData: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {};

        if (!formData.title) {
            errors.title = 'Title is required';
        }

        if (!formData.uploadedDate) {
            errors.uploadedDate = 'Date is required';
        }
        return errors;
    };

    return (
        <>
            <Session />
            <div className="p-4 sm:ml-64 my-8">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 my-8">
                    <div className="flex items-center justify-center">
                        <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
                            <div>
                                <Toaster />
                                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Add Assignment</h2>
                            </div>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title" className="block text-gray-700">Title</label>
                                    <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                                </div>
                                <div>
                                    <label htmlFor="uploadedDate" className="block text-gray-700">Uploaded Date</label>
                                    <input type="date" id="uploadedDate" name="uploadedDate" value={formData.uploadedDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                    {errors.uploadedDate && <p className="text-red-500 text-xs italic">{errors.uploadedDate}</p>}
                                </div>
                                <div >
                                    <label htmlFor="assignmentFile" className="block text-gray-700">Assignment File</label>
                                    <input
                                        type="file"
                                        id="assignmentFile"
                                        name="assignmentFile"
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Save Assignment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
