import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Chapter, Videos } from "../../../Redux/Slice";
import { ArrowLeft } from "lucide-react";

function ChapterShow() {
  const { chapterById, loading, error } = useSelector((state) => state.Subject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visited, setVisited] = useState(() => {
    const savedVisit = localStorage.getItem('Subjects');
    return savedVisit ? JSON.parse(savedVisit) : [];
  });

  useEffect(() => {
     
      dispatch(Chapter()); 
    
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('Subjects', JSON.stringify(visited));
  }, [visited]);

  const handleClick = (chapterId) => {
    setVisited((prevVisited) => {
      const updatedVisited = prevVisited.filter((visitedId) => visitedId !== chapterId);
      return [...updatedVisited, chapterId];
    });
    dispatch(Videos(chapterId));
    navigate('/Videolist');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8231D3] to-[#6A28AC] relative overflow-hidden mx-auto">
      <header className="p-4 flex items-center">
        <div className="p-4">
          <Link to={'/'}>
            <button className="p-2">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
          </Link>
        </div>
        <h1 className="text-white text-2xl font-medium flex-1 text-center mr-8">
          Chapter Details
        </h1>
      </header>

      <div className="px-4 py-2 max-w-md mx-auto relative">
        {chapterById.map((chapter, index) => (
          <div 
            key={chapter.id} 
            className={`relative flex flex-col items-center text-center gap-5 mb-10 ${index % 2 !== 0 ? 'left-0 ml-24' : 'right-0 mr-24'} after:content-[''] after:absolute after:top-full after:w-1 after:h-36 after:border-l-2 after:border-dashed after:border-yellow-300/60 after:rounded-tl-lg`}
            onClick={() => handleClick(chapter.id)}
          >
            <h2 className="text-lg font-semibold text-white max-w-40">{chapter.title}</h2>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${visited[visited.length - 1] === chapter.id ? 'bg-amber-300' : ''}`}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#9333ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 left-6 right-6">
        <button
          className="w-full bg-white text-purple-700 py-4 rounded-full text-lg font-medium shadow-lg shadow-purple-900/20"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ChapterShow;
