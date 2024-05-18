"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  firstname: string;
  lastname: string;
  childname: string;
  username: string;
  email: string;
  phoneNo: string;
  password: string;
  myfile: File | null;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    childname: '',
    username: '',
    email: '',
    phoneNo: '',
    password: '',
    myfile: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('firstname', formData.firstname);
        formDataObject.append('lastname', formData.lastname);
        formDataObject.append('childname', formData.childname);
        formDataObject.append('username', formData.username);
        formDataObject.append('email', formData.email);
        formDataObject.append('phoneNo', formData.phoneNo);
        formDataObject.append('password', formData.password);
        if (formData.myfile) {
          formDataObject.append('myfile', formData.myfile);
        }
        console.log(formDataObject);
        const response = await axios.post('http://localhost:8000/auth/signup', formDataObject);
        
        toast.success('Signup successful!');
        router.push('/SignIn');
     
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'myfile') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.firstname) {
      errors.firstname = 'Name is required';
    }

    if (!formData.lastname) {
        errors.lastname = 'Name is required';
      }

    if (!formData.childname) {
        errors.childname = 'Name is required';
      }

      if (!formData.username) {
        errors.username = 'User name is required';
      }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    
    if (!formData.phoneNo) {
        errors.phoneNo = 'Phone Number is required';
      } else if (!/\b\d{3}-\d{8}\b/.test(formData.phoneNo)) {
        errors.phoneNo = 'Invalid Phone Number';
      }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSigninClick = () => {
    router.push('/SignIn'); 
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">
           First Name
          </label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstname && <p className="text-red-500 text-xs italic">{errors.firstname}</p>}
        </div>
       
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">
            Last Name
          </label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastname && <p className="text-red-500 text-xs italic">{errors.lastname}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="childname" className="block text-gray-700 font-bold mb-2">
            Child Name
          </label>
          <input type="text" id="childname" name="childname" value={formData.childname} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.childname && <p className="text-red-500 text-xs italic">{errors.childname}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNo" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input type="text" id="phoneNo" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phoneNo && <p className="text-red-500 text-xs italic">{errors.phoneNo}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="myfile" className="block text-gray-700 font-bold mb-2">
            Upload Your Image
          </label>
          <input type="file" id="myfile" name="myfile" onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
               </div>
        <div className="flex items-center justify-between">
          <button type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </button>
        </div>
        <div className="text-center">
            <p>Already have an account? <span className="text-indigo-600 cursor-pointer" onClick={handleSigninClick}>SignIn</span></p>
          </div>
      </form>
    </div>
  );
};

