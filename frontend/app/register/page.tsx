"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Link from "next/link";
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';

interface FormData {
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

function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
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
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
                console.log(formData);
                const response = await axios.post('http://localhost:4000/student/authentication/register', formData);
                if (!response) {
                    toast.error('Registration unsuccessful!');
                    router.push('/register');
                }
                toast.success('Register successful');
                router.push('/login');

            } catch (error) {
                console.error('Error during register:', error);
                toast.error('Registration failed! Please try again.');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = (formData: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {};

        if (!formData.fullName) {
            errors.fullName = 'Full Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[a-zA-Z]).{8,}/;
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!passwordPattern.test(formData.password)) {
            errors.password = 'Password must be at least 8 characters, include at least one uppercase and one lowercase letter, a special character, and a digit';
        }

        if (!formData.address) {
            errors.address = 'Address is required';
        }

        if (!formData.program) {
            errors.program = 'Program is required';
        }

        if (!formData.fatherName) {
            errors.fatherName = 'Father Name is required';
        }

        if (!formData.gender) {
            errors.gender = 'Gender is required';
        }

        if (!formData.dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        }

        if (!formData.nationality) {
            errors.nationality = 'Nationality is required';
        }

        if (!formData.religion) {
            errors.religion = 'Religion is required';
        }

        const bloodGroupPattern = /^(A|B|AB|O)[+-]$/;
        if (!formData.bloodGroup) {
            errors.bloodGroup = 'Blood Group is required';
        } else if (!bloodGroupPattern.test(formData.bloodGroup)) {
            errors.bloodGroup = 'Invalid blood group format. Valid formats: A+, B-, AB+, O-';
        }

        const phoneNumberPattern = /^01\d{9}$/;
        if (!formData.phoneNumber) {
            errors.phoneNumber = 'Phone Number is required';
        } else if (!phoneNumberPattern.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number format. Phone number must start with 01 and be 11 digits long';
        }

        if (!formData.admissionDate) {
            errors.admissionDate = 'Admission Date is required';
        }
        return errors;
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center my-8">
                <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
                    <div>
                        <Toaster />
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Register Your Account</h2>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="program" className="block text-gray-700">Program</label>
                                <input type="text" id="program" name="program" value={formData.program} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.program && <p className="text-red-500 text-xs italic">{errors.program}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fatherName" className="block text-gray-700">Father Name</label>
                            <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            {errors.fatherName && <p className="text-red-500 text-xs italic">{errors.fatherName}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700">Gender</label>
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio h-4 w-4 text-blue-600" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="radio" className="form-radio h-4 w-4 text-blue-600" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} />
                                        <span className="ml-2">Female</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input type="radio" className="form-radio h-4 w-4 text-blue-600" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleInputChange} />
                                        <span className="ml-2">Other</span>
                                    </label>
                                </div>
                                {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth</label>
                                <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="address" className="block text-gray-700">Address</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                            </div>
                            <div>
                                <label htmlFor="nationality" className="block text-gray-700">Nationality</label>
                                <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.nationality && <p className="text-red-500 text-xs italic">{errors.nationality}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="religion" className="block text-gray-700">Religion</label>
                                <input type="text" id="religion" name="religion" value={formData.religion} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.religion && <p className="text-red-500 text-xs italic">{errors.religion}</p>}
                            </div>
                            <div>
                                <label htmlFor="bloodGroup" className="block text-gray-700">Blood Group</label>
                                <input type="text" id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.bloodGroup && <p className="text-red-500 text-xs italic">{errors.bloodGroup}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
                            </div>
                            <div>
                                <label htmlFor="admissionDate" className="block text-gray-700">Admission Date</label>
                                <input type="date" id="admissionDate" name="admissionDate" value={formData.admissionDate} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                                {errors.admissionDate && <p className="text-red-500 text-xs italic">{errors.admissionDate}</p>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Already have an account?</p> <Link href="/login"><p className="text-blue-500 hover:underline">Login here</p></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Register;
