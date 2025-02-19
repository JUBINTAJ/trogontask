import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setVideoById, Videos } from '../../../Redux/Slice'; 
import { ArrowLeft} from "lucide-react"

function Videoss() {
  const { video, loading, error } = useSelector((state) => state.Subject);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => {
      dispatch(Videos()); 
    };
    fn();
  }, [ dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8e6ff] p-4">
          <div className="p-4">
          <Link  to={'/chapter'}>
        <button className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </button>
          </Link>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-[28px] w-[2px] h-[calc(100%-60px)] bg-[#9333ea]" />
        
        {video.map((item, index) => (
          <div key={item.id} className="flex items-start mb-12 relative" onClick={() => {dispatch(setVideoById(item)); navigate(`/Videoplay/${item.id}`); }}>
            <div className="w-10 h-10 rounded-full bg-[#9333ea] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="text-gray-600 text-sm">{`Step ${index + 1}`}</div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">{item.title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 left-4 right-4">
        <button className="w-full bg-[#9333ea] text-white py-4 rounded-full text-lg font-medium">Continue</button>
      </div>
    </div>
  );
}

export default Videoss;
