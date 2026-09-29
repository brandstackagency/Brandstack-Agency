import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  getEditableText: (key: string, defaultValue: string) => string;
  setEditableText: (key: string, value: string) => void;
  getLogo: () => string;
  setLogo: (url: string) => void;
  clearLogo: () => void;
  saveEdits: () => void;
  hasPendingChanges: boolean;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

const STORAGE_KEY = 'brandstack_editable_content';
const LOGO_KEY = 'brandstack_logo';

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});
  const [savedContent, setSavedContent] = useState<Record<string, string>>({});
  const [logo, setLogoState] = useState<string>('');
  const [savedLogo, setSavedLogo] = useState<string>('');
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setContent(parsed);
        setSavedContent(parsed);
      }
      const storedLogo = localStorage.getItem(LOGO_KEY);
      if (storedLogo) {
        setLogoState(storedLogo);
        setSavedLogo(storedLogo);
      }
    } catch (error) {
      console.error('Failed to load editable content:', error);
    }
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const getEditableText = (key: string, defaultValue: string): string => {
    return content[key] ?? defaultValue;
  };

  const setEditableText = (key: string, value: string) => {
    setContent(prev => {
      const updated = { ...prev, [key]: value };
      setHasPendingChanges(true);
      return updated;
    });
  };

  const getLogo = () => logo;

  const setLogo = (url: string) => {
    setLogoState(url);
    setHasPendingChanges(true);
  };

  const clearLogo = () => {
    setLogoState('');
    setHasPendingChanges(true);
  };

  const saveEdits = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      if (logo) {
        localStorage.setItem(LOGO_KEY, logo);
      } else {
        localStorage.removeItem(LOGO_KEY);
      }
      setSavedContent(content);
      setSavedLogo(logo);
      setHasPendingChanges(false);
    } catch (error) {
      console.error('Failed to save editable content:', error);
    }
  }, [content, logo]);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        getEditableText,
        setEditableText,
        getLogo,
        setLogo,
        clearLogo,
        saveEdits,
        hasPendingChanges,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
}
