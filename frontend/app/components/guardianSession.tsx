"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link'; 

interface User {
    //id:number;
  firstname: string;
  lastname: string;
  childname: string;
  username: string;
  email: string;
  phoneNo: string;
  filename: string
}

export default function Session () {
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
          router.push('/SignIn');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/SignIn');
      } 
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div></div>;
  }

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.push('/SignIn');
  };


  return (
    <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
    <label htmlFor="my-drawer" className="btn btn-ghost text-xl">Welcome back, {user.firstname}</label>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered h-10 w-24 md:w-auto text-blue-900" />
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-primary btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={'http://localhost:8000/st_guardian/getimage/'+user.filename} />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral ghost text-x1 rounded-box w-52">
          <li>
           
           {/* Use Link to create a link to the profile page */}
           <Link href={`/Profile/${user.email}`}>
                 Profile
              </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a>Notifications</a></li>
          <li>
          <button
      className="bg-neutral hover:text-blue-900 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleLogout}
    >
      Logout
    </button>

          </li>
        </ul>
      </div>
    </div>
    
  </div>

  
  );

};