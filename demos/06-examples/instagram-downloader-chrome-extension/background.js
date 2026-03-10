// Background service worker for handling downloads
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadVideo') {
    handleDownload(request.videoUrl, request.filename)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Keep channel open for async response
  }

  if (request.action === 'getVideoFromTab') {
    getVideoFromTab(request.tabId)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }
});

async function getVideoFromTab(tabId) {
  try {
    // Inject content script if needed
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).catch(() => {
      // Content script may already be injected
    });

    // Wait a bit for content script to load
    await new Promise(resolve => setTimeout(resolve, 300));

    // Try to get video URL with retries
    const maxRetries = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`Attempt ${attempt}/${maxRetries} to get video URL...`);

      try {
        // Send message to content script
        const response = await chrome.tabs.sendMessage(tabId, { action: 'getVideoUrl' });

        if (response && response.videoUrl) {
          console.log('Successfully got video URL:', response.videoUrl);
          return { videoUrl: response.videoUrl };
        } else if (response && response.error) {
          lastError = response.error;
          console.log(`Attempt ${attempt} failed:`, response.error);
        } else {
          lastError = 'No video found';
          console.log(`Attempt ${attempt} failed: No video found`);
        }
      } catch (error) {
        lastError = error.message || 'Failed to get video URL';
        console.log(`Attempt ${attempt} error:`, lastError);
      }

      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return { error: lastError || 'No video found after multiple attempts' };
  } catch (error) {
    return { error: error.message || 'Failed to get video URL' };
  }
}

async function handleDownload(videoUrl, filename) {
  try {
    const downloadId = await chrome.downloads.download({
      url: videoUrl,
      filename: filename,
      saveAs: true,
      conflictAction: 'uniquify'
    });

    return {
      success: true,
      downloadId: downloadId,
      message: 'Download started successfully'
    };
  } catch (error) {
    console.error('Download error:', error);
    return {
      error: error.message || 'Download failed',
      success: false
    };
  }
}

// Listen for download completion
chrome.downloads.onChanged.addListener((delta) => {
  if (delta.state && delta.state.current === 'complete') {
    console.log('Download completed:', delta.id);
  }
  if (delta.error) {
    console.error('Download error:', delta.error);
  }
});
