"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface User {
  firstname: string;
  lastname: string;
  childname: string;
  username: string;
  email: string;
  phoneNo: string;
  filename: string;
}

const Profile: React.FC<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
        if (token) {
          const response = await axios.get('http://localhost:8000/st_guardian/getuser/'+email, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data);
        } else {
          router.push('/Profile/${user.email}');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/Profile/${user.email}');
      } 
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div></div>;
  }

  if (!user) {
    return <div>Not found</div>;
  }

<div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img src={`http://localhost:8000/st_guardian/getimage/${user.filename}`} alt="User" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <p className="text-lg font-semibold">{user.firstname} {user.lastname}</p>
          <p className="text-gray-600">{user.username}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Childname: {user.childname}</p>
        <p className="text-sm text-gray-600">Email: {user.email}</p>
        <p className="text-sm text-gray-600">Phone Number: {user.phoneNo}</p>
      </div>
      <div className="flex justify-between">

        <Link href={`/updateProfile/`}>
          <div className="text-blue-500 hover:underline">Edit Profile</div>
        </Link>
      </div>
    </div>

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
      <div className="flex items-center mb-4">
        <img src={`http://localhost:8000/st_guardian/getimage/${user.filename}`} alt="User" className="w-24 h-24 rounded-full mr-4" />
        <div>
          <p className="text-xl font-semibold">{user.firstname} {user.lastname}</p>
          <p className="text-gray-600">{user.username}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-base text-gray-600">Childname: {user.childname}</p>
        <p className="text-base text-gray-600">Email: {user.email}</p>
        <p className="text-base text-gray-600">Phone Number: {user.phoneNo}</p>
      </div>
      <div className="flex justify-between">
        <Link href={`/updateProfile/`}>
          <div className="text-blue-500 hover:underline"></div>Edit Profile
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Profile;
