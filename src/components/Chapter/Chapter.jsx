import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Videos } from "../../../Redux/Slice";

function ChapterShow() {
  const { chapterById, loading, error } = useSelector((state) => state.Subject);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChapter = () => {
    dispatch(Videos(id));
    navigate('/Videolist');
  };

  return (
    <div className="min-h-screen bg-[#8E2DE2]">
      <header className="p-4 flex items-center">
        <Link to="/">
          <button className="text-white text-2xl">
            &larr;
          </button>
        </Link>
        <h1 className="text-white text-2xl font-medium flex-1 text-center mr-8">
          Chapter Details
        </h1>
      </header>

      <div className="px-4 py-2 max-w-xl mx-auto">
        {chapterById.map((chapter) => (
          <div 
            key={chapter.id} 
            className=" rounded-xl p-6 mb-8 cursor-pointer"
            onClick={() => { setId(chapter.id); handleChapter(); }}
          >
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-white">{chapter.title}</h2>
              <div className="w-30 h-30 bg-[#9333ea] rounded-full flex items-center justify-center mb-4 relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#9333ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterShow;
