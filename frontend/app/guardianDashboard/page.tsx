
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Session from '../components/guardianSession';
import Sidebar from '../components/sidebar';

export default async function Dashboard() {
  let jsondata = [];

  try {
    const response = await axios.get('http://localhost:8000/st_guardian/getuser/$email');
    jsondata = response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error, such as displaying an error message to the user
  }

  console.log('jsondata:', jsondata); 

  return (
    <>
      <Session />
      


      <div className="flex justify-center mt-16 space-x-4">
        <div className="card pt-4 pl-4 w-98 md:w-72 bg-base-100 shadow-xl">
          <figure className="w-20 h-20 md:w-20 md:h-20">
            <img src="https://cdn-icons-png.freepik.com/512/3589/3589030.png" alt="attendance" className="w-full h-full object-contain" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg md:text-base">Is your child attending all of his/her classes?</h2>
            <p className="text-sm">Check their attendance now</p>
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary text-sm">Check</button>
            </div>
          </div>
        </div>
        <div className="card pt-4 pl-4 w-98 md:w-72 bg-base-100 shadow-xl">
        <figure className="w-20 h-20 md:w-20 md:h-20">
            <img src="https://www.clipartmax.com/png/small/46-465671_performance-learning-blog-student-studying-icon.png" alt="performance" className="w-full h-full object-contain" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg md:text-base">Would you an update on your child's progress?</h2>
            <p className="text-sm">See their Performance</p>
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary text-sm">Go</button>
            </div>
          </div>
        </div>
        <div className="card pt-4 pl-4 w-98 md:w-72 bg-base-100 shadow-xl">
        <figure className="w-20 h-20 md:w-20 md:h-20">
            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/school-meeting-6351972-5335078.png" alt="pta" className="w-full h-full object-contain" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg md:text-base">Meet with the Teachers!</h2>
            <p className="text-sm">Schedule Your PTA</p>
            <div className="card-actions justify-end mt-2">
              <button className="btn btn-primary text-sm">Go</button>
            </div>
          </div>
        </div>
      </div>



      <Sidebar/>
    </>
  );
}
