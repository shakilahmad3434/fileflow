import React, { useState } from 'react';
import { Upload, Camera, Layers, Wand2, Filter, UserCheck, Settings } from 'lucide-react';

const ImageStudio = () => {
  const [activeTab, setActiveTab] = useState('batch');
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
    if (files.length > 0 && !previewImage) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    setSelectedImages([...selectedImages, ...files]);
    if (files.length > 0 && !previewImage) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    if (newImages.length > 0) {
      setPreviewImage(URL.createObjectURL(newImages[0]));
    } else {
      setPreviewImage(null);
    }
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'batch':
        return <BatchProcessingPanel />;
      case 'watermark':
        return <WatermarkPanel />;
      case 'ai':
        return <AIEnhancementsPanel />;
      case 'filters':
        return <FiltersPanel />;
      case 'face':
        return <FaceDetectionPanel />;
      default:
        return <BatchProcessingPanel />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-orange-500 font-bold text-xl mr-8">FileFlow</div>
          <h1 className="text-xl font-semibold">Image Studio</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="bg-gray-800 rounded-md px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-2 top-2 text-gray-400 text-xs">⌘ + K</span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-800">
            <Settings size={20} className="text-gray-400" />
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-semibold">U</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-20 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-6 space-y-6">
          <ToolButton icon={<Layers size={24} />} text="Batch" active={activeTab === 'batch'} onClick={() => setActiveTab('batch')} />
          <ToolButton icon={<Filter size={24} />} text="Watermark" active={activeTab === 'watermark'} onClick={() => setActiveTab('watermark')} />
          <ToolButton icon={<Wand2 size={24} />} text="AI" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} /> 
          <ToolButton icon={<Camera size={24} />} text="Filters" active={activeTab === 'filters'} onClick={() => setActiveTab('filters')} />
          <ToolButton icon={<UserCheck size={24} />} text="Face" active={activeTab === 'face'} onClick={() => setActiveTab('face')} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
          {/* Breadcrumb and Actions */}
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Image Studio</span>
              <span className="text-gray-500">/</span>
              <span>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">
                Save Preset
              </button>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md text-sm">
                Process Images
              </button>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Image Upload and Preview */}
            <div className="w-1/3 border-r border-gray-800 flex flex-col">
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-gray-700 rounded-lg m-4 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <Upload size={40} className="text-gray-500 mb-4" />
                <p className="text-gray-300 mb-2">Drag & drop images here</p>
                <p className="text-gray-500 text-sm">or click to browse</p>
                <input 
                  id="file-upload" 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </div>
              
              {/* Uploaded Images */}
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Selected Images ({selectedImages.length})</h3>
                <div className="space-y-2">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="flex items-center bg-gray-800 p-2 rounded-md">
                      <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden mr-3">
                        <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{image.name}</p>
                        <p className="text-xs text-gray-500">{Math.round(image.size / 1024)} KB</p>
                      </div>
                      <button onClick={() => removeImage(index)} className="text-gray-500 hover:text-white">
                        &times;
                      </button>
                    </div>
                  ))}
                  {selectedImages.length === 0 && (
                    <p className="text-gray-500 text-sm">No images selected</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Preview and Tools */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Preview Area */}
              <div className="flex-1 flex items-center justify-center bg-gray-950 m-4 rounded-lg overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="text-gray-500 text-center">
                    <p>Image preview will appear here</p>
                  </div>
                )}
              </div>
              
              {/* Tool Options */}
              <div className="bg-gray-800 m-4 p-4 rounded-lg overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tool Button Component
const ToolButton = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 p-2 rounded-md transition-colors ${active ? 'text-orange-500 bg-gray-800' : 'text-gray-400 hover:text-white'}`}
  >
    {icon}
    <span className="text-xs">{text}</span>
  </button>
);

// Tool Panels
const BatchProcessingPanel = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium">Batch Processing</h3>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Resize Images</label>
      <div className="flex space-x-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Width</label>
          <input type="number" className="bg-gray-700 rounded p-2 w-24 text-sm" placeholder="Width" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Height</label>
          <input type="number" className="bg-gray-700 rounded p-2 w-24 text-sm" placeholder="Height" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            Maintain aspect ratio
          </label>
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Compression</label>
      <div className="flex items-center space-x-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          defaultValue="80" 
          className="flex-1" 
        />
        <span className="text-sm w-8">80%</span>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Convert Format</label>
      <div className="grid grid-cols-4 gap-2">
        <FormatButton format="JPG" active />
        <FormatButton format="PNG" />
        <FormatButton format="WEBP" />
        <FormatButton format="AVIF" />
      </div>
    </div>
  </div>
);

const WatermarkPanel = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium">Watermarking</h3>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Watermark Type</label>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm">Text</button>
        <button className="px-4 py-2 bg-gray-900 text-gray-400 rounded-md text-sm">Image Logo</button>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Text Content</label>
      <input type="text" className="bg-gray-700 rounded p-2 w-full text-sm" placeholder="© Your Company" />
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Position</label>
      <div className="grid grid-cols-3 gap-2">
        <button className="p-2 bg-gray-700 rounded-md">Top Left</button>
        <button className="p-2 bg-gray-700 rounded-md">Top Center</button>
        <button className="p-2 bg-gray-700 rounded-md">Top Right</button>
        <button className="p-2 bg-gray-700 rounded-md">Center Left</button>
        <button className="p-2 bg-orange-500 rounded-md">Center</button>
        <button className="p-2 bg-gray-700 rounded-md">Center Right</button>
        <button className="p-2 bg-gray-700 rounded-md">Bottom Left</button>
        <button className="p-2 bg-gray-700 rounded-md">Bottom Center</button>
        <button className="p-2 bg-gray-700 rounded-md">Bottom Right</button>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Opacity</label>
      <div className="flex items-center space-x-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          defaultValue="50" 
          className="flex-1" 
        />
        <span className="text-sm w-8">50%</span>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Size</label>
      <div className="flex items-center space-x-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          defaultValue="30" 
          className="flex-1" 
        />
        <span className="text-sm w-8">30%</span>
      </div>
    </div>
  </div>
);

const AIEnhancementsPanel = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium">AI Enhancements</h3>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer">
        <h4 className="font-medium mb-2">Auto Enhance</h4>
        <p className="text-sm text-gray-400">Automatically fix lighting, contrast, and colors</p>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer">
        <h4 className="font-medium mb-2">Denoise</h4>
        <p className="text-sm text-gray-400">Remove grain and noise artifacts</p>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer">
        <h4 className="font-medium mb-2">Sharpen</h4>
        <p className="text-sm text-gray-400">Enhance details and clarity</p>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer">
        <h4 className="font-medium mb-2">Super Resolution</h4>
        <p className="text-sm text-gray-400">Intelligently upscale images</p>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Enhancement Strength</label>
      <div className="flex items-center space-x-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          defaultValue="70" 
          className="flex-1" 
        />
        <span className="text-sm w-8">70%</span>
      </div>
    </div>
    
    <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-orange-500">
      <h4 className="font-medium mb-2">AI Processing</h4>
      <p className="text-sm text-gray-400">AI enhancements will be applied to all selected images using TensorFlow.js. Processing may take a few moments depending on image size and quantity.</p>
    </div>
  </div>
);

const FiltersPanel = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium">Custom Filters</h3>
    
    <div className="grid grid-cols-4 gap-3">
      <FilterThumbnail name="Original" active />
      <FilterThumbnail name="Grayscale" />
      <FilterThumbnail name="Sepia" />
      <FilterThumbnail name="Invert" />
      <FilterThumbnail name="Vintage" />
      <FilterThumbnail name="Cool" />
      <FilterThumbnail name="Warm" />
      <FilterThumbnail name="High Contrast" />
    </div>
    
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-400 text-sm">Custom Settings</label>
        <button className="text-xs text-orange-500">Save as New Filter</button>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Brightness</label>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <input type="range" min="-100" max="100" defaultValue="0" className="w-full" />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Contrast</label>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <input type="range" min="-100" max="100" defaultValue="0" className="w-full" />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Saturation</label>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <input type="range" min="-100" max="100" defaultValue="0" className="w-full" />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-gray-500">Hue</label>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <input type="range" min="0" max="360" defaultValue="0" className="w-full" />
        </div>
      </div>
    </div>
  </div>
);

const FaceDetectionPanel = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium">Face Detection</h3>
    
    <div className="bg-gray-700 rounded-lg p-4">
      <p className="text-sm text-gray-300 mb-4">Face detection uses browser AI to identify faces in your images. No data is sent to external servers.</p>
      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md text-sm w-full">
        Detect Faces
      </button>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Actions</label>
      <div className="space-y-2">
        <label className="flex items-center text-sm">
          <input type="radio" name="face-action" className="mr-2" checked />
          <span>Auto-crop around detected faces</span>
        </label>
        <label className="flex items-center text-sm">
          <input type="radio" name="face-action" className="mr-2" />
          <span>Blur faces for privacy</span>
        </label>
        <label className="flex items-center text-sm">
          <input type="radio" name="face-action" className="mr-2" />
          <span>Highlight faces only</span>
        </label>
      </div>
    </div>
    
    <div>
      <label className="block text-gray-400 text-sm mb-2">Options</label>
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Detection Confidence</label>
          <div className="flex items-center space-x-2">
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="80" 
              className="flex-1" 
            />
            <span className="text-sm w-8">80%</span>
          </div>
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Crop Margin</label>
          <div className="flex items-center space-x-2">
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="20" 
              className="flex-1" 
            />
            <span className="text-sm w-8">20%</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="text-sm text-gray-400">
      <p>Detected faces: 0</p>
    </div>
  </div>
);

// Helper Components
const FormatButton = ({ format, active }) => (
  <button className={`p-2 rounded-md text-sm ${active ? 'bg-orange-500' : 'bg-gray-700'}`}>
    {format}
  </button>
);

const FilterThumbnail = ({ name, active }) => (
  <div className={`rounded-md overflow-hidden cursor-pointer ${active ? 'ring-2 ring-orange-500' : ''}`}>
    <div className="h-16 bg-gray-800"></div>
    <div className="p-1 text-center text-xs bg-gray-700 truncate">{name}</div>
  </div>
);

export default ImageStudio;