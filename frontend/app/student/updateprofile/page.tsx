"use client"

import React, { useEffect, useState } from 'react';
import Session from '@/app/components/session';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    fullName: string;
    email: string;
    program: string;
    password: string;
    fatherName: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    nationality: string;
    religion: string;
    bloodGroup: string;
    phoneNumber: string;
    admissionDate: string;
}

export default function UpdateProfile() {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        id: 0,
        fullName: '',
        email: '',
        program: '',
        password: '',
        fatherName: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        nationality: '',
        religion: '',
        bloodGroup: '',
        phoneNumber: '',
        admissionDate: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                if (user_id) {
                    const response = await axios.get(`http://localhost:4000/student/profile/${user_id}`);
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user_id = localStorage.getItem('user_id');
            if (user_id) {
                const response = await axios.patch(`http://localhost:4000/student/updateProfile/${user_id}`, user);
                toast.success('Profile updated successfully');
                router.push('/student/profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <>
            <Toaster />
            <Session />
            <div className="p-4 sm:ml-64 my-8">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 my-8">
                    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                        <div className="flex items-center gap-4">
                            <img src={'http://localhost:4000/student/getProfilePicture/' + user?.id}
                                className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                            />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white overflow-hidden shadow rounded-lg border">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    My Profile
                                </h3>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Full name
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={user?.fullName || ''}
                                                onChange={handleChange}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Email address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={user?.email || ''}
                                                onChange={handleChange}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Father Name
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="tet"
                                                name="fatherName"
                                                value={user?.fatherName || ''}
                                                onChange={handleChange}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="address"
                                                value={user?.address || ''}
                                                onChange={handleChange}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                            />
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Phone number
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={user?.phoneNumber || ''}
                                                onChange={handleChange}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                                            />
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-3"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
