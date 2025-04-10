import React from 'react';
import { FileText, Image, Video, File, Film, Paperclip, Music } from 'lucide-react';

// Icon mapping for file types in the main list
export const getListFileIcon = (type) => {
  switch(type) {
    case 'document': return <FileText className="text-blue-500" />;
    case 'image': return <Image className="text-red-500" />;
    case 'video': return <Video className="text-purple-500" />;
    default: return <File className="text-yellow-500" />;
  }
};

// Icon mapping for file types in the upload modal
export const getUploadModalFileTypeIcon = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
  const videoTypes = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  const documentTypes = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'];
  const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
  const audioTypes = ['mp3', 'wav', 'ogg', 'flac', 'aac'];
  
  if (imageTypes.includes(extension)) return <Image className="text-red-500" />;
  if (videoTypes.includes(extension)) return <Film className="text-purple-500" />;
  if (documentTypes.includes(extension)) return <FileText className="text-blue-500" />;
  if (archiveTypes.includes(extension)) return <Paperclip className="text-yellow-500" />;
  if (audioTypes.includes(extension)) return <Music className="text-green-500" />;
  
  return <File className="text-gray-400" />;
};