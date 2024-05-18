"use client"

import React from "react";

import Session from "./session";

export default function Sidebar(){

    <Session/>

    return (
        <div className="drawer">
  {/* Checkbox input to control the drawer */}
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    
    {/* Content of the drawer */}
  </div>
  <div className="drawer-side">
    {/* Drawer overlay */}
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    {/* Sidebar content */}
    <ul className="menu p-4 pt-16 w-80 min-h-full bg-base-200 text-base-content">
    <ul className="menu bg-base-200 w-56 rounded-box">
  <li><a>Student's Profile</a></li>
  <li>
    <details open>
      <summary>Performance Analytics</summary>
      <ul>
        <li><a>Course A</a></li>
        <li><a>Course B</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details open>
      <summary>Grade Reports</summary>
      <ul>
        <li><a>Semester</a></li>
        <li><a>Curriculum</a></li>
      </ul>
    </details>
  </li>
  <li><a>Student's Weekly Attendance Report</a></li>
  <li><a>Request PTA meeting</a></li>
  <li><a>Student's Leave Request</a></li>
  <li><a>Payment</a></li>
</ul>
    </ul>
  </div>
</div>
      );
    };
