import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Download Instagram Reels, Videos, Stories, and IGTV for free with InstaSaver Pro. Fast, secure, and mobile-friendly.", 
  image = "https://picsum.photos/1200/630", 
  url = window.location.href 
}) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | InstaSaver Pro`;

    // Update Meta Tags
    const metaTags = {
      description: description,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };

    Object.entries(metaTags).forEach(([name, value]) => {
      // Handle standard meta description
      if (name === 'description') {
        let element = document.querySelector(`meta[name="description"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', 'description');
          document.head.appendChild(element);
        }
        element.setAttribute('content', value);
      } else {
        // Handle Open Graph and Twitter tags
        // Try property first (for og:)
        let element = document.querySelector(`meta[property="${name}"]`);
        // If not found, try name (for twitter:)
        if (!element) {
          element = document.querySelector(`meta[name="${name}"]`);
        }
        
        if (!element) {
          element = document.createElement('meta');
          if (name.startsWith('og:')) {
            element.setAttribute('property', name);
          } else {
            element.setAttribute('name', name);
          }
          document.head.appendChild(element);
        }
        element.setAttribute('content', value);
      }
    });
  }, [title, description, image, url]);

  return null;
};

export default SEO;