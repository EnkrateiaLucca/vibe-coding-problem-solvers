// Store captured video URLs from network requests
let capturedVideoUrls = new Set();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getVideoUrl') {
    // Use async pattern to avoid timing issues
    (async () => {
      try {
        const videoUrl = await extractVideoUrl();
        sendResponse({ videoUrl: videoUrl });
      } catch (error) {
        console.error('Error extracting video:', error);
        sendResponse({ error: error.message });
      }
    })();
    return true; // Keep the message channel open for async response
  }
});

async function extractVideoUrl() {
  console.log('Starting video URL extraction...');

  // Method 1: Check captured URLs from network requests
  if (capturedVideoUrls.size > 0) {
    console.log('Found video URL from network capture:', capturedVideoUrls);
    const urls = Array.from(capturedVideoUrls);
    return urls[urls.length - 1]; // Return most recent
  }

  // Method 2: Try to find video element directly
  const videoElement = document.querySelector('video');
  console.log('Video element found:', videoElement);

  if (videoElement && videoElement.src && !videoElement.src.startsWith('blob:')) {
    console.log('Found video URL from video element src:', videoElement.src);
    return videoElement.src;
  }

  // Method 3: Check video source elements
  if (videoElement) {
    const sourceElement = videoElement.querySelector('source');
    if (sourceElement && sourceElement.src && !sourceElement.src.startsWith('blob:')) {
      console.log('Found video URL from source element:', sourceElement.src);
      return sourceElement.src;
    }
  }

  // Method 4: Look for meta tags
  const metaVideo = document.querySelector('meta[property="og:video"]');
  if (metaVideo && metaVideo.content) {
    console.log('Found video URL from og:video meta tag:', metaVideo.content);
    return metaVideo.content;
  }

  const metaVideoSecure = document.querySelector('meta[property="og:video:secure_url"]');
  if (metaVideoSecure && metaVideoSecure.content) {
    console.log('Found video URL from og:video:secure_url meta tag:', metaVideoSecure.content);
    return metaVideoSecure.content;
  }

  // Method 5: Try to extract from article elements
  const articles = document.querySelectorAll('article');
  console.log('Found articles:', articles.length);

  for (const article of articles) {
    const videos = article.querySelectorAll('video');
    for (const video of videos) {
      if (video.src && !video.src.startsWith('blob:')) {
        console.log('Found video URL from article video:', video.src);
        return video.src;
      }

      const source = video.querySelector('source');
      if (source && source.src && !source.src.startsWith('blob:')) {
        console.log('Found video URL from article video source:', source.src);
        return source.src;
      }
    }
  }

  // Method 6: Parse window data objects
  try {
    if (window._sharedData && window._sharedData.entry_data) {
      const entryData = window._sharedData.entry_data;
      const data = JSON.stringify(entryData);

      const videoUrlMatch = data.match(/"video_url":"([^"]+)"/);
      if (videoUrlMatch && videoUrlMatch[1]) {
        const url = videoUrlMatch[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
        console.log('Found video URL from window._sharedData:', url);
        return url;
      }
    }
  } catch (e) {
    console.log('Error parsing window._sharedData:', e);
  }

  // Method 7: Check for data in page scripts
  const scripts = document.querySelectorAll('script');
  console.log('Searching through', scripts.length, 'script tags...');

  for (const script of scripts) {
    const text = script.textContent;

    // Look for video_url pattern
    if (text.includes('video_url')) {
      const match = text.match(/"video_url":"([^"]+)"/);
      if (match && match[1]) {
        const url = match[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
        console.log('Found video URL from video_url pattern:', url);
        return url;
      }
    }

    // Look for video_versions pattern (Reels)
    if (text.includes('video_versions')) {
      const match = text.match(/"video_versions":\[{"url":"([^"]+)"/);
      if (match && match[1]) {
        const url = match[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
        console.log('Found video URL from video_versions pattern:', url);
        return url;
      }
    }

    // Look for playback_url pattern
    if (text.includes('playback_url')) {
      const match = text.match(/"playback_url":"([^"]+)"/);
      if (match && match[1]) {
        const url = match[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
        console.log('Found video URL from playback_url pattern:', url);
        return url;
      }
    }

    // Look for src pattern with .mp4
    if (text.includes('.mp4')) {
      const matches = text.match(/https?:[^"'\s]+\.mp4[^"'\s]*/g);
      if (matches && matches.length > 0) {
        const url = matches[0].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
        console.log('Found video URL from .mp4 pattern:', url);
        return url;
      }
    }
  }

  console.error('No video URL found after trying all methods');
  throw new Error('Could not find video URL. Make sure this page has a video and try refreshing the page.');
}

// Helper function to monitor for new videos loaded dynamically
function observeVideos() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        for (const node of mutation.addedNodes) {
          if (node.tagName === 'VIDEO') {
            console.log('New video detected:', node.src);
            if (node.src && !node.src.startsWith('blob:')) {
              capturedVideoUrls.add(node.src);
            }
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Intercept fetch requests to capture video URLs
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0];
  if (typeof url === 'string' && url.includes('.mp4')) {
    console.log('Captured video URL from fetch:', url);
    capturedVideoUrls.add(url);
  }
  return originalFetch.apply(this, args);
};

// Intercept XMLHttpRequest to capture video URLs
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...rest) {
  if (typeof url === 'string' && url.includes('.mp4')) {
    console.log('Captured video URL from XMLHttpRequest:', url);
    capturedVideoUrls.add(url);
  }
  return originalOpen.call(this, method, url, ...rest);
};

// Monitor video element src changes
function monitorVideoSources() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video.src && !video.src.startsWith('blob:')) {
      capturedVideoUrls.add(video.src);
    }

    // Watch for src attribute changes
    const srcObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
          const newSrc = video.getAttribute('src');
          if (newSrc && !newSrc.startsWith('blob:')) {
            console.log('Video src changed to:', newSrc);
            capturedVideoUrls.add(newSrc);
          }
        }
      });
    });

    srcObserver.observe(video, { attributes: true, attributeFilter: ['src'] });
  });
}

// Start monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting video monitoring...');
    observeVideos();
    monitorVideoSources();
  });
} else {
  console.log('DOM already loaded, starting video monitoring...');
  observeVideos();
  monitorVideoSources();
}

// Re-scan for video sources periodically
setInterval(monitorVideoSources, 2000);
