"use client"
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  firstname: string;
  lastname: string;
  childname: string;
  username: string;
  email: string;
  phoneNo: string;
}

const Profile: React.FC<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    firstname: '',
    lastname: '',
    childname: '',
    username: '',
    email: '$email',
    phoneNo: ''
  });

  const [errors, setErrors] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token) {
          const response = await axios.get(`http://localhost:8000/st_guardian/getuser/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setFormData(response.data);
        } else {
          router.push(`/Profile/${user?.email}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push(`/Profile/${user?.email}`);
      }
    };

    fetchUserData();
  }, [router, email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log(formData);
          const response = await axios.patch(`http://localhost:8000/st_guardian/profile/${email}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success('Update successful!');
          router.push(`/updateProfile`);
        }
      } catch (error) {
        console.error('Error during update:', error);
        toast.error('Update failed. Please try again later.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (formData: User): Partial<User> => {
    const errors: Partial<User> = {};

    if (!formData.firstname) {
      errors.firstname = 'Firstname is required';
    }

    if (!formData.lastname) {
      errors.lastname = 'Lastname is required';
    }

    if (!formData.childname) {
      errors.childname = 'Childname is required';
    }

    if (!formData.username) {
      errors.username = 'Username is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.phoneNo) {
      errors.phoneNo = 'Phone number is required';
    } else if (!/\b\d{3}-\d{8}\b/.test(formData.phoneNo)) {
      errors.phoneNo = 'Invalid phone number';
    }

    return errors;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <Toaster />
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Firstname:</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} 
            className="input input-bordered w-full"
            />
            {errors.firstname && <p className="text-red-500 text-xs italic">{errors.firstname}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Lastname:</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange}
              className="input input-bordered w-full"
            />
            {errors.lastname && <p className="text-red-500 text-xs italic">{errors.lastname}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange}
              className="input input-bordered w-full"
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">PhoneNo:</label>
            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange}
              className="input input-bordered w-full"
            />
            {errors.phoneNo && <p className="text-red-500 text-xs italic">{errors.phoneNo}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
