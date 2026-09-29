import { useRef } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface EditableLogoProps {
  className?: string;
  alt?: string;
  variant?: 'light' | 'dark';
}

export default function EditableLogo({ className = '', alt = 'Brandstack Agency', variant = 'dark' }: EditableLogoProps) {
  const { isEditMode, getLogo, setLogo, clearLogo } = useEditMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setLogo(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const logoUrl = getLogo();

  if (logoUrl) {
    return (
      <div className="relative inline-block bg-transparent">
        <img
          src={logoUrl}
          alt={alt}
          className={`${className} bg-transparent object-contain ${
            isEditMode
              ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-[#7C3AED]/50 hover:outline-offset-4 transition-all'
              : ''
          }`}
          style={{ background: 'transparent' }}
          onClick={handleLogoClick}
          title={isEditMode ? 'Click to change logo' : alt}
        />
        {isEditMode && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-lg cursor-pointer">
              <i className="ri-edit-2-fill text-white text-xs"></i>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); clearLogo(); }}
              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-600 transition-colors"
              title="Remove custom logo"
            >
              <i className="ri-close-line text-white text-xs"></i>
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block bg-transparent">
      <div
        className={`bg-transparent ${className} ${
          isEditMode
            ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-[#7C3AED]/50 hover:outline-offset-4 transition-all'
            : ''
        }`}
        onClick={handleLogoClick}
        title={isEditMode ? 'Click to change logo' : alt}
      >
        <span
          style={{
            fontFamily: "'League Spartan', 'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'inherit',
            letterSpacing: '0.04em',
            textTransform: 'lowercase',
            lineHeight: '1',
            background: 'linear-gradient(135deg, #9333ea 0%, #7C3AED 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block',
          }}
        >
          brandstack
        </span>
      </div>
      {isEditMode && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-lg">
            <i className="ri-edit-2-fill text-white text-xs"></i>
          </div>
        </>
      )}
    </div>
  );
}
