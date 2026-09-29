import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface EditableTextProps {
  id: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  id,
  defaultValue,
  as: Component = 'div',
  className = '',
  multiline = false,
}: EditableTextProps) {
  const { isEditMode, getEditableText, setEditableText } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const editableRef = useRef<HTMLDivElement>(null);

  // Get the current text value
  const currentText = getEditableText(id, defaultValue);

  useEffect(() => {
    setValue(currentText);
  }, [currentText]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
          // Select all text
          const range = document.createRange();
          range.selectNodeContents(editableRef.current);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 0);
    }
  };

  const handleBlur = () => {
    if (isEditing) {
      const newValue = editableRef.current?.innerText || '';
      setEditableText(id, newValue);
      setValue(newValue);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      editableRef.current?.blur();
    }
    if (e.key === 'Escape') {
      // Revert changes
      if (editableRef.current) {
        editableRef.current.innerText = currentText;
      }
      editableRef.current?.blur();
    }
  };

  if (isEditMode) {
    return (
      <Component
        ref={editableRef as any}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} ${
          isEditMode && !isEditing
            ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-[#5B2DFF]/30 hover:outline-offset-2 transition-all'
            : ''
        } ${isEditing ? 'outline outline-2 outline-[#5B2DFF] outline-offset-2' : ''}`}
        style={isEditing ? { minWidth: '50px', minHeight: '20px' } : undefined}
      >
        {value}
      </Component>
    );
  }

  return <Component className={className}>{value}</Component>;
}