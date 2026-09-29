import { useState, useRef } from 'react';
import { useEditMode } from '../../contexts/EditModeContext';

interface EditableProjectProps {
  projectId: number;
  field: string;
  defaultValue: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

const PROJECTS_STORAGE_KEY = 'brandstack_projects';

export function EditableProjectField({
  projectId,
  field,
  defaultValue,
  className = '',
  as: Component = 'div',
  multiline = false,
}: EditableProjectProps) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  const getProjectData = () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setProjectData = (data: any) => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save project data:', error);
    }
  };

  const getCurrentValue = () => {
    const data = getProjectData();
    return data[projectId]?.[field] ?? defaultValue;
  };

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
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
      const data = getProjectData();
      if (!data[projectId]) data[projectId] = {};
      data[projectId][field] = newValue;
      setProjectData(data);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      editableRef.current?.blur();
    }
    if (e.key === 'Escape') {
      if (editableRef.current) {
        editableRef.current.innerText = getCurrentValue();
      }
      editableRef.current?.blur();
    }
  };

  const currentValue = getCurrentValue();

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
        {currentValue}
      </Component>
    );
  }

  return <Component className={className}>{currentValue}</Component>;
}

interface EditableProjectImageProps {
  projectId: number;
  defaultImage: string;
  alt: string;
  className?: string;
}

export function EditableProjectImage({ projectId, defaultImage, alt, className = '' }: EditableProjectImageProps) {
  const { isEditMode } = useEditMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getProjectData = () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setProjectData = (data: any) => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save project data:', error);
    }
  };

  const getCurrentImage = () => {
    const data = getProjectData();
    return data[projectId]?.image ?? defaultImage;
  };

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const data = getProjectData();
        if (!data[projectId]) data[projectId] = {};
        data[projectId].image = imageUrl;
        setProjectData(data);
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <img
        src={getCurrentImage()}
        alt={alt}
        className={`${className} ${
          isEditMode ? 'cursor-pointer hover:opacity-80 hover:ring-4 hover:ring-[#5B2DFF]/30 transition-all' : ''
        }`}
        onClick={handleImageClick}
      />
      {isEditMode && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </>
  );
}

interface EditableListProps {
  projectId: number;
  field: string;
  defaultItems: string[];
  renderItem: (item: string, index: number, onEdit: (newValue: string) => void, onRemove: () => void) => React.ReactNode;
  addButtonText?: string;
}

export function EditableProjectList({
  projectId,
  field,
  defaultItems,
  renderItem,
  addButtonText = 'Add Item',
}: EditableListProps) {
  const { isEditMode } = useEditMode();

  const getProjectData = () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setProjectData = (data: any) => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      console.error('Failed to save project data:', error);
    }
  };

  const getCurrentItems = (): string[] => {
    const data = getProjectData();
    return data[projectId]?.[field] ?? defaultItems;
  };

  const handleEdit = (index: number, newValue: string) => {
    const data = getProjectData();
    if (!data[projectId]) data[projectId] = {};
    const items = [...getCurrentItems()];
    items[index] = newValue;
    data[projectId][field] = items;
    setProjectData(data);
  };

  const handleRemove = (index: number) => {
    const data = getProjectData();
    if (!data[projectId]) data[projectId] = {};
    const items = getCurrentItems().filter((_, i) => i !== index);
    data[projectId][field] = items;
    setProjectData(data);
  };

  const handleAdd = () => {
    const data = getProjectData();
    if (!data[projectId]) data[projectId] = {};
    const items = [...getCurrentItems(), 'New item'];
    data[projectId][field] = items;
    setProjectData(data);
  };

  const items = getCurrentItems();

  return (
    <div>
      {items.map((item, index) =>
        renderItem(
          item,
          index,
          (newValue) => handleEdit(index, newValue),
          () => handleRemove(index)
        )
      )}
      {isEditMode && (
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-[#5B2DFF] text-white text-sm font-semibold rounded-lg hover:bg-[#4A1FE6] transition-all cursor-pointer whitespace-nowrap"
        >
          <i className="ri-add-line mr-2"></i>
          {addButtonText}
        </button>
      )}
    </div>
  );
}

interface EditableMetricsProps {
  projectId: number;
  defaultMetrics: Array<{ label: string; value: string }>;
}

export function EditableProjectMetrics({ projectId, defaultMetrics }: EditableMetricsProps) {
  const { isEditMode } = useEditMode();

  const getProjectData = () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setProjectData = (data: any) => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      console.error('Failed to save project data:', error);
    }
  };

  const getCurrentMetrics = () => {
    const data = getProjectData();
    return data[projectId]?.metrics ?? defaultMetrics;
  };

  const handleEdit = (index: number, field: 'label' | 'value', newValue: string) => {
    const data = getProjectData();
    if (!data[projectId]) data[projectId] = {};
    const metrics = [...getCurrentMetrics()];
    metrics[index][field] = newValue;
    data[projectId].metrics = metrics;
    setProjectData(data);
  };

  const handleRemove = (index: number) => {
    const data = getProjectData();
    if (!data[projectId]) data[projectId] = {};
    const metrics = getCurrentMetrics().filter((_: any, i: number) => i !== index);
    data[projectId].metrics = metrics;
    setProjectData(data);
  };

  const handleAdd = () => {
    const data = getProjectData();
    if (!data[projectId]) data[projectId] = {};
    const metrics = [...getCurrentMetrics(), { label: 'New Metric', value: '0%' }];
    data[projectId].metrics = metrics;
    setProjectData(data);
  };

  const metrics = getCurrentMetrics();

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m: any, i: number) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/15 transition-all relative group"
          >
            {isEditMode && (
              <button
                onClick={() => handleRemove(i)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center text-xs"
              >
                <i className="ri-close-line"></i>
              </button>
            )}
            <EditableMetricField
              projectId={projectId}
              metricIndex={i}
              field="value"
              defaultValue={m.value}
              className="font-editorial font-black text-white text-4xl mb-1"
            />
            <EditableMetricField
              projectId={projectId}
              metricIndex={i}
              field="label"
              defaultValue={m.label}
              className="text-white/70 text-xs font-semibold uppercase tracking-wider"
            />
          </div>
        ))}
      </div>
      {isEditMode && (
        <button
          onClick={handleAdd}
          className="mt-6 px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/30 transition-all cursor-pointer whitespace-nowrap border border-white/30"
        >
          <i className="ri-add-line mr-2"></i>
          Add Metric
        </button>
      )}
    </>
  );
}

function EditableMetricField({
  projectId,
  metricIndex,
  field,
  defaultValue,
  className,
}: {
  projectId: number;
  metricIndex: number;
  field: 'label' | 'value';
  defaultValue: string;
  className: string;
}) {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  const getProjectData = () => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setProjectData = (data: any) => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save project data:', error);
    }
  };

  const getCurrentValue = () => {
    const data = getProjectData();
    return data[projectId]?.metrics?.[metricIndex]?.[field] ?? defaultValue;
  };

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus();
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
      const data = getProjectData();
      if (!data[projectId]) data[projectId] = {};
      if (!data[projectId].metrics) data[projectId].metrics = [];
      if (!data[projectId].metrics[metricIndex]) {
        data[projectId].metrics[metricIndex] = { label: '', value: '' };
      }
      data[projectId].metrics[metricIndex][field] = newValue;
      setProjectData(data);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editableRef.current?.blur();
    }
    if (e.key === 'Escape') {
      if (editableRef.current) {
        editableRef.current.innerText = getCurrentValue();
      }
      editableRef.current?.blur();
    }
  };

  const currentValue = getCurrentValue();

  if (isEditMode) {
    return (
      <div
        ref={editableRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} ${
          isEditMode && !isEditing
            ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-white/50 hover:outline-offset-2 transition-all'
            : ''
        } ${isEditing ? 'outline outline-2 outline-white outline-offset-2' : ''}`}
        style={isEditing ? { minWidth: '50px', minHeight: '20px' } : undefined}
      >
        {currentValue}
      </div>
    );
  }

  return <div className={className}>{currentValue}</div>;
}