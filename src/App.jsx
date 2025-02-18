import { Route, Routes } from "react-router-dom"; 
import Subject from "./components/Subject/Subject";
import ChapterShow from "./components/Chapter/Chapter";
import Videoslist from './components/Videoslist/Videos'
import Videoplay from './components/Videoplay/Videoplay'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Subject />} />
        <Route path="/chapter" element={<ChapterShow />} />
        <Route path="/Videolist" element={<Videoslist />} />
        <Route path="/Videoplay/:link" element={<Videoplay />} />



      </Routes>
    </div>
  );
}

export default App;
