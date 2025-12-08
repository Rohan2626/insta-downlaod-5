import { VideoResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const validateUrl = (url: string): boolean => {
  const regex = /instagram\.com\/(reel|p|stories|tv)/;
  return regex.test(url);
};

export const fetchVideoInfo = async (url: string): Promise<VideoResult> => {
  if (!validateUrl(url)) {
    throw new Error('Invalid Instagram URL. Please check the link and try again.');
  }

  const response = await fetch(`${API_BASE_URL}/api/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to download video');
  }

  const data = await response.json();

  // Transform backend response to VideoResult type
  const directUrl = data.downloadUrls?.[0];

  // URL for forced download (save as)
  const downloadUrl = directUrl
    ? `${API_BASE_URL}/api/download/proxy?url=${encodeURIComponent(directUrl)}&download=true`
    : '#';

  // URL for streaming preview (inline)
  const previewUrl = directUrl
    ? `${API_BASE_URL}/api/download/proxy?url=${encodeURIComponent(directUrl)}`
    : '#';

  // Proxy the thumbnail as well
  const thumbnailUrl = data.thumbnail
    ? `${API_BASE_URL}/api/download/proxy?url=${encodeURIComponent(data.thumbnail)}`
    : '';

  return {
    id: Math.random().toString(36).substring(7),
    url: url,
    thumbnail: thumbnailUrl,
    title: data.title || 'Instagram Video',
    description: data.description || '',
    tags: data.tags || [],
    duration: data.duration || '0:00',
    quality: 'HD',
    type: url.includes('reel') ? 'Reel' : 'Video',
    downloadUrl: downloadUrl,
    previewUrl: previewUrl,
    timestamp: Date.now()
  };
};