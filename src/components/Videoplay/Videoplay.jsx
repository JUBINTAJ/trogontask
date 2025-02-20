import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoById, Videos } from '../../../Redux/Slice';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, HelpCircle } from "lucide-react";
import ReactPlayer from 'react-player';

function Videoplay() {
  const { videoById, loading, error } = useSelector((state) => state.Subject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Videos);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!videoById) {
    return <div>Video not found</div>;
  }

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&controls=0&fs=0&cc_load_policy=0&autohide=1&disablekb=1&fs=0`
      : "";
  };
  
  const getVimeoEmbedUrl = (url) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1&background=1&byline=0&title=0&portrait=0` : '';
  };

  let embedUrl = "";
  if (videoById.video_type === 'YouTube') {
    embedUrl = getYouTubeEmbedUrl(videoById.video_url);
  } else if (videoById.video_type === 'Vimeo') {
    embedUrl = getVimeoEmbedUrl(videoById.video_url);
  }

  return (
    <div className="min-h-screen bg-[#f8e6ff] p-4">
      <div className="p-4">
        <Link to={'/Videolist'}>
          <button className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <div className="relative">
        <div className="w-full h-[500px] bg-gray-900 flex justify-center items-center relative">
          {embedUrl ? (
       <ReactPlayer
  url={embedUrl}
  config={{
    youtube: {
      playerVars: { showinfo: 1 ,controls:false }
    },
    facebook: {
      appId: '12345'
    }
  }}
/>
          ) : (
            <div className="p-5 text-white">Invalid video URL</div>
          )}
        </div>

        <div className="lg:h-[400px] sm:h-auto w-full shadow-2xl p-10 flex flex-col gap-5 bg-white">
          <h1 className="text-3xl font-bold">{videoById.title}</h1>
          <p className="text-gray-600">{videoById.description}</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button className="flex items-center justify-center gap-2 bg-white rounded-2xl py-4 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow">
              <Download className="h-5 w-5" />
              <span className="font-medium">Download</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white rounded-2xl py-4 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow">
              <HelpCircle className="h-5 w-5" />
              <span className="font-medium">Doubts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videoplay;