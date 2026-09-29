import { useState } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

export default function EditModeToggle() {
  const { isEditMode, toggleEditMode, saveEdits, hasPendingChanges } = useEditMode();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveEdits();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* Edit Mode Banner */}
      {isEditMode && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[#5B2DFF] text-white py-3 px-6 text-center text-sm font-medium shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <i className="ri-information-line text-lg"></i>
            <span>Edit Mode Active. Click any text to edit. Press Enter to save, Escape to cancel.</span>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {/* Save Button, only visible in edit mode */}
        {isEditMode && (
          <button
            onClick={handleSave}
            className={`px-6 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap ${
              saved
                ? 'bg-[#10B981] text-white'
                : hasPendingChanges
                ? 'bg-white text-[#5B2DFF] border-2 border-[#5B2DFF] hover:bg-[#5B2DFF] hover:text-white'
                : 'bg-white/60 text-black/40 border-2 border-black/10 cursor-default'
            }`}
            disabled={!hasPendingChanges && !saved}
            title={hasPendingChanges ? 'Save all changes' : 'No unsaved changes'}
          >
            <i className={`${saved ? 'ri-check-line' : 'ri-save-line'} text-lg`}></i>
            <span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        )}

        {/* Edit Mode Toggle */}
        <button
          onClick={toggleEditMode}
          className={`px-6 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap ${
            isEditMode
              ? 'bg-[#5B2DFF] text-white hover:bg-[#4A1FE6]'
              : 'bg-black text-white hover:bg-black/90'
          }`}
          title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        >
          <i className={`${isEditMode ? 'ri-close-line' : 'ri-edit-line'} text-lg`}></i>
          <span>{isEditMode ? 'Exit Edit Mode' : 'Edit Mode'}</span>
        </button>
      </div>
    </>
  );
}
