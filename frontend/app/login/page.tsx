"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

interface FormData {
    email: string;
    password: string;
}

function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/student/authentication/login', formData);
            console.log(response.data);

            if(!response)
            {
                toast.error('Login Unsuccessful!');
                router.push('/login');
            }
            const token = response.data;
            console.log(token.access_token);
            localStorage.setItem('token', token.access_token);
            //localStorage.setItem('email', formData.email);
            localStorage.setItem('user_id', token.user_id);

            toast.success('Login Successful');
            router.push('/student/home');
        } catch (error) {
            console.error('Error login:', error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                    <div>
                        <Toaster/>
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Login to Your Account</h2>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email Address</label>
                            <input type="text" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input type="password" id="password" name="password" autoComplete="current-password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Don't have an account?</p><Link href="/register"><p className="text-blue-500 hover:underline">Register here</p></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Login;