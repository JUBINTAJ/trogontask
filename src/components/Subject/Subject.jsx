import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chapter, getsubject } from "../../../Redux/Slice";
import { useNavigate } from "react-router-dom";

function Subject() {
  const dispatch = useDispatch();
  const [id,setId]=useState(null)
  const { subject, loading, error } = useSelector((state) => state.Subject);
  const navigate=useNavigate()

  useEffect(() => {
    dispatch(getsubject());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  const handle=()=>{
    dispatch(Chapter(id))
    navigate('/chapter')
  }

  return (
    <div className="min-h-screen bg-[#8E2DE2]">
      <header className="p-4 flex items-center">
               <button className="text-white text-2xl">
            &larr;
          </button>
        <h1 className="text-white text-2xl font-medium flex-1 text-center mr-8">
          Modules
        </h1>
      </header>

      <div className="px-4 py-2 max-w-xl mx-auto">
        <div className="bg-white/95 rounded-xl p-6 mb-8">
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-lg">Current Course :</p>
              <h2 className="text-xl font-semibold">Subjects</h2>
            </div>
            <button className="w-full bg-[#8E2DE2] hover:bg-[#7928CA] text-white py-2 rounded-lg">
              Browse Other Course
            </button>
          </div>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-6">
        Subjects
        </h2>

        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/20" />

          <div className="space-y-8">
            {subject.map((subjectt) => (
              <div key={subjectt.id} className="flex items-start gap-4" onClick={()=>{setId(subjectt.id);handle()}}>
                <div className="relative z-10 w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                  <span className="text-[#8E2DE2] text-xl font-bold">{subjectt.id}</span>
                </div>

                <div className="flex-1 bg-white/10 rounded-xl p-4 pr-2 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-white font-medium">{subjectt.title}</h3>
                      <p className="text-yellow-300 text-sm">{subjectt.description}</p> 
                    </div>
              
                    <span className="text-white/70">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subject;
