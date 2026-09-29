import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface Video {
  id: string;
  title: string;
  description: string;
  type: 'file' | 'embed';
  url: string;
  thumbnail?: string;
}

interface VideoGalleryProps {
  projectId: string;
}

const VideoGallery = ({ projectId }: VideoGalleryProps) => {
  const { isEditMode } = useEditMode();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [showEmbedInput, setShowEmbedInput] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load videos from localStorage
  useEffect(() => {
    const storageKey = `project_videos_${projectId}`;
    const savedVideos = localStorage.getItem(storageKey);
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (e) {
        console.error('Failed to parse videos:', e);
      }
    }
  }, [projectId]);

  // Save videos to localStorage
  const saveVideos = (updatedVideos: Video[]) => {
    const storageKey = `project_videos_${projectId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('video/')) {
        alert('Please upload video files only (MP4, MOV, WEBM)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const videoUrl = event.target?.result as string;
        
        // Generate thumbnail from video
        const video = document.createElement('video');
        video.src = videoUrl;
        video.currentTime = 1;
        video.onloadeddata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.7);

          const newVideo: Video = {
            id: `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: file.name.replace(/\.[^/.]+$/, ''),
            description: '',
            type: 'file',
            url: videoUrl,
            thumbnail
          };

          const updatedVideos = [...videos, newVideo];
          saveVideos(updatedVideos);
        };
      };
      reader.readAsDataURL(file);
    });

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle embed URL
  const handleAddEmbed = () => {
    if (!embedUrl.trim()) return;

    let processedUrl = embedUrl.trim();
    let thumbnail = '';

    // Convert YouTube URL to embed format
    if (processedUrl.includes('youtube.com/watch')) {
      const videoId = new URL(processedUrl).searchParams.get('v');
      if (videoId) {
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
        thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (processedUrl.includes('youtu.be/')) {
      const videoId = processedUrl.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
        thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    // Convert Vimeo URL to embed format
    else if (processedUrl.includes('vimeo.com/')) {
      const videoId = processedUrl.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        processedUrl = `https://player.vimeo.com/video/${videoId}`;
        thumbnail = `https://vumbnail.com/${videoId}.jpg`;
      }
    }

    const newVideo: Video = {
      id: `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: 'Embedded Video',
      description: '',
      type: 'embed',
      url: processedUrl,
      thumbnail
    };

    const updatedVideos = [...videos, newVideo];
    saveVideos(updatedVideos);
    setEmbedUrl('');
    setShowEmbedInput(false);
  };

  // Remove video
  const handleRemove = (id: string) => {
    const updatedVideos = videos.filter((v) => v.id !== id);
    saveVideos(updatedVideos);
  };

  // Start editing
  const startEditing = (video: Video) => {
    setEditingId(video.id);
    setEditTitle(video.title);
    setEditDescription(video.description);
  };

  // Save edit
  const saveEdit = () => {
    if (!editingId) return;

    const updatedVideos = videos.map((v) =>
      v.id === editingId
        ? { ...v, title: editTitle, description: editDescription }
        : v
    );
    saveVideos(updatedVideos);
    setEditingId(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  // Don't render if no videos and not in edit mode
  if (videos.length === 0 && !isEditMode) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-10 h-px bg-[#5B2DFF]"></div>
            <span className="text-[#5B2DFF] text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">
              Video Gallery
            </span>
            <div className="w-8 md:w-10 h-px bg-[#5B2DFF]"></div>
          </div>
          <h2
            className="font-editorial font-black text-[#0D0D0D] leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Project <span className="italic text-[#5B2DFF]">Videos</span>
          </h2>
        </div>

        {/* Upload Controls - Only in Edit Mode */}
        {isEditMode && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#5B2DFF] text-white text-sm font-semibold rounded-lg hover:bg-[#4A1FE6] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                <i className="ri-upload-2-line text-lg"></i>
                <span>{isUploading ? 'Uploading...' : 'Upload Video'}</span>
              </button>

              <button
                onClick={() => setShowEmbedInput(!showEmbedInput)}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-[#5B2DFF] text-[#5B2DFF] text-sm font-semibold rounded-lg hover:bg-[#5B2DFF] hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-link text-lg"></i>
                <span>Add YouTube/Vimeo</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/mov,video/webm"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />

            {showEmbedInput && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder="Paste YouTube or Vimeo URL..."
                  className="flex-1 px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#5B2DFF] transition-colors"
                />
                <button
                  onClick={handleAddEmbed}
                  className="px-6 py-3 bg-[#5B2DFF] text-white text-sm font-semibold rounded-lg hover:bg-[#4A1FE6] transition-colors duration-300 whitespace-nowrap cursor-pointer"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowEmbedInput(false);
                    setEmbedUrl('');
                  }}
                  className="px-4 py-3 border border-black/10 text-black/40 text-sm font-semibold rounded-lg hover:border-black/20 transition-colors duration-300 whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            <p className="text-xs text-black/40">
              Supported formats: MP4, MOV, WEBM • Or paste YouTube/Vimeo links
            </p>
          </div>
        )}

        {/* Video Grid */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group relative bg-white rounded-xl border border-black/[0.07] overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div
                  onClick={() => setSelectedVideo(video)}
                  className="relative aspect-video bg-black/5 overflow-hidden cursor-pointer"
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-video-line text-4xl text-black/20"></i>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <i className="ri-play-fill text-3xl text-[#5B2DFF] ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs font-semibold rounded">
                    {video.type === 'embed' ? 'Embed' : 'Upload'}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  {editingId === video.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#5B2DFF]"
                        placeholder="Video title"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm resize-none focus:outline-none focus:border-[#5B2DFF]"
                        rows={3}
                        placeholder="Video description"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="flex-1 px-3 py-2 bg-[#5B2DFF] text-white text-xs font-semibold rounded-lg hover:bg-[#4A1FE6] transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 px-3 py-2 border border-black/10 text-black/60 text-xs font-semibold rounded-lg hover:border-black/20 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-[#0D0D0D] text-base mb-2 line-clamp-1">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-black/50 text-sm leading-relaxed line-clamp-2 mb-3">
                          {video.description}
                        </p>
                      )}

                      {isEditMode && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => startEditing(video)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#5B2DFF]/40 text-[#5B2DFF] text-xs font-semibold rounded-lg hover:bg-[#5B2DFF] hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-edit-line"></i>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleRemove(video.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-500/40 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                            <span>Remove</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          isEditMode && (
            <div className="text-center py-12 border-2 border-dashed border-black/10 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
                <i className="ri-video-line text-3xl text-black/20"></i>
              </div>
              <p className="text-black/40 text-sm">
                No videos yet. Upload a video or add a YouTube/Vimeo link to get started.
              </p>
            </div>
          )
        )}
      </div>

      {/* Video Lightbox Modal */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden"
          >
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {selectedVideo.type === 'embed' ? (
                <iframe
                  src={selectedVideo.url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Video Info */}
            <div className="p-6 bg-white">
              <h3 className="font-bold text-[#0D0D0D] text-xl mb-2">
                {selectedVideo.title}
              </h3>
              {selectedVideo.description && (
                <p className="text-black/60 text-sm leading-relaxed">
                  {selectedVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;