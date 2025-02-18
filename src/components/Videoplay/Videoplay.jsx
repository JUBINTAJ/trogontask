import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Videos } from '../../../Redux/Slice';

function Videoplay() {
  const { videoById, loading, error } = useSelector((state) => state.Subject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Videos()); 
  }, [ dispatch]);

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
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&controls=1&fs=0&cc_load_policy=0`
      : '';
  };

  const getVimeoEmbedUrl = (url) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1&background=1&byline=0&title=0&portrait=0` : '';
  };

  let embedUrl = '';
  if (videoById.video_type === 'YouTube') {
    embedUrl = getYouTubeEmbedUrl(videoById.video_url);
  } else if (videoById.video_type === 'Vimeo') {
    embedUrl = getVimeoEmbedUrl(videoById.video_url);
  }

  return (
    <div className="min-h-screen bg-[#f8e6ff] p-4">
      <div className="flex items-center mb-8">
        <button className="text-black text-2xl" onClick={() => window.history.back()}>
          &larr; Back
        </button>
      </div>

      <div className="relative">
        <div className="w-full h-[500px] bg-gray-900 flex justify-center items-center relative">
          {embedUrl ? (
          <iframe
          className="w-full h-full"
          src={`${embedUrl}?modestbranding=1&rel=0&autoplay=1&controls=0&fs=0&iv_load_policy=3&disablekb=1`}
          title={videoById.title}
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
          ) : (
            <div className="p-5 text-white">Invalid video URL</div>
          )}
        </div>

        <div className="lg:h-[400px] sm:h-auto w-full shadow-2xl p-10 flex flex-col gap-5 bg-white">
          <h1 className="text-3xl font-bold">{videoById.title}</h1>
          <p className="text-gray-600">{videoById.description}</p>
          <div className="flex flex gap-6 mt-8 justify-center items-center">
    <button className="bg-white text-black py-4 px-12 text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      Download
    </button>
    <button className="bg-white text-black py-4 px-12 text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      Doubts
    </button>
  </div>
        </div>
      </div>
    </div>
  );
}

export default Videoplay;
