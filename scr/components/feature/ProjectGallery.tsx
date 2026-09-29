import { useState, useRef } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

interface ProjectGalleryProps {
  projectId: number;
}

const GALLERY_STORAGE_KEY = 'brandstack_project_galleries';

export default function ProjectGallery({ projectId }: ProjectGalleryProps) {
  const { isEditMode } = useEditMode();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getGalleryData = (): Record<number, GalleryImage[]> => {
    try {
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setGalleryData = (data: Record<number, GalleryImage[]>) => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save gallery data:', error);
    }
  };

  const getImages = (): GalleryImage[] => {
    const data = getGalleryData();
    return data[projectId] || [];
  };

  const [images, setImages] = useState<GalleryImage[]>(getImages());

  const saveImages = (newImages: GalleryImage[]) => {
    const data = getGalleryData();
    data[projectId] = newImages;
    setGalleryData(data);
    setImages(newImages);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: GalleryImage[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file),
        caption: '',
      }));

    saveImages([...images, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const updateCaption = (id: string, caption: string) => {
    const updated = images.map(img =>
      img.id === id ? { ...img, caption } : img
    );
    saveImages(updated);
  };

  const removeImage = (id: string) => {
    const updated = images.filter(img => img.id !== id);
    saveImages(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOverItem = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedItem);

    setImages(newImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null) {
      saveImages(images);
      setDraggedIndex(null);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  if (!isEditMode && images.length === 0) {
    return null;
  }

  return (
    <section className="py-14 bg-[#F8F7F4] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      ></div>
      <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-[#5B2DFF]/10 rounded-xl border border-[#5B2DFF]/20">
            <i className="ri-gallery-line text-xl text-[#5B2DFF]"></i>
          </div>
          <h2 className="font-editorial font-bold text-[#0D0D0D] text-2xl">Photo Gallery</h2>
        </div>

        {/* Upload Zone (Edit Mode Only) */}
        {isEditMode && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 mb-8 ${
              isDragging
                ? 'border-[#5B2DFF] bg-[#5B2DFF]/5'
                : 'border-black/10 hover:border-black/20 bg-white'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5">
                <i className="ri-upload-cloud-2-line text-2xl text-black/40"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-black mb-1">
                  {isDragging ? 'Drop images here' : 'Add photos to gallery'}
                </p>
                <p className="text-xs text-black/50">
                  Drag & drop or click to browse
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable={isEditMode}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOverItem(e, index)}
                onDragEnd={handleDragEnd}
                className={`group relative bg-white rounded-xl overflow-hidden border border-black/[0.07] shadow-sm hover:shadow-md transition-all ${
                  isEditMode ? 'cursor-move' : ''
                } ${draggedIndex === index ? 'opacity-50' : ''}`}
              >
                {/* Image */}
                <div
                  onClick={() => !isEditMode && openLightbox(index)}
                  className={`relative aspect-[4/3] w-full overflow-hidden ${
                    !isEditMode ? 'cursor-pointer' : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {!isEditMode && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="ri-zoom-in-line text-xl text-[#5B2DFF]"></i>
                      </div>
                    </div>
                  )}
                  {isEditMode && (
                    <div className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg border border-black/10">
                      <i className="ri-draggable text-black/40"></i>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="p-4">
                  {isEditMode ? (
                    <div className="space-y-2">
                      <textarea
                        value={image.caption}
                        onChange={(e) => updateCaption(image.id, e.target.value)}
                        placeholder="Add a caption..."
                        className="w-full text-sm text-black/70 bg-white border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#5B2DFF] focus:ring-2 focus:ring-[#5B2DFF]/20 resize-none"
                        rows={2}
                      />
                      <button
                        onClick={() => removeImage(image.id)}
                        className="w-full px-3 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        Remove Photo
                      </button>
                    </div>
                  ) : (
                    image.caption && (
                      <p className="text-sm text-black/70 leading-relaxed">
                        {image.caption}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-black/[0.07]">
            <div className="w-16 h-16 flex items-center justify-center bg-[#5B2DFF]/10 rounded-full mx-auto mb-4 border border-[#5B2DFF]/20">
              <i className="ri-image-line text-3xl text-[#5B2DFF]"></i>
            </div>
            <p className="text-black/40 text-sm">
              {isEditMode
                ? 'No photos yet. Upload some images to get started.'
                : 'No photos in this gallery.'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all cursor-pointer z-10"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all cursor-pointer z-10"
            >
              <i className="ri-arrow-left-line text-2xl"></i>
            </button>
          )}

          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all cursor-pointer z-10"
            >
              <i className="ri-arrow-right-line text-2xl"></i>
            </button>
          )}

          <div
            className="max-w-6xl max-h-[90vh] mx-auto px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].caption || `Gallery image ${lightboxIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {images[lightboxIndex].caption && (
              <div className="mt-4 text-center">
                <p className="text-white text-base leading-relaxed max-w-2xl mx-auto">
                  {images[lightboxIndex].caption}
                </p>
              </div>
            )}
            <div className="mt-4 text-center">
              <p className="text-white/50 text-sm">
                {lightboxIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}