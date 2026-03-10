document.addEventListener('DOMContentLoaded', async () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const statusDiv = document.getElementById('status');
  const errorDiv = document.getElementById('error');

  // Check if we're on Instagram
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab.url || !tab.url.includes('instagram.com')) {
    statusDiv.textContent = 'Please navigate to Instagram';
    return;
  }

  // Check if we're on a post page
  const isPostPage = tab.url.match(/instagram\.com\/(p|reel|tv)\//);
  
  if (!isPostPage) {
    statusDiv.textContent = 'Please open an Instagram post with a video';
    return;
  }

  // Enable the download button
  downloadBtn.disabled = false;
  statusDiv.textContent = 'Ready to download!';
  statusDiv.classList.add('success');

  downloadBtn.addEventListener('click', async () => {
    try {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Searching for video...';
      errorDiv.classList.add('hidden');

      // Send message to background script to get video URL
      const videoResponse = await chrome.runtime.sendMessage({
        action: 'getVideoFromTab',
        tabId: tab.id
      });

      if (videoResponse.error) {
        throw new Error(videoResponse.error);
      }

      if (!videoResponse.videoUrl) {
        throw new Error('No video found on this page');
      }

      downloadBtn.textContent = 'Downloading...';

      // Send download request to background script
      const downloadResponse = await chrome.runtime.sendMessage({
        action: 'downloadVideo',
        videoUrl: videoResponse.videoUrl,
        filename: `instagram_video_${Date.now()}.mp4`
      });

      if (downloadResponse.error) {
        throw new Error(downloadResponse.error);
      }

      downloadBtn.textContent = '✓ Download Started!';
      statusDiv.textContent = 'Video download started!';
      statusDiv.classList.add('success');

      setTimeout(() => {
        downloadBtn.textContent = 'Download Video';
        downloadBtn.disabled = false;
      }, 2000);

    } catch (error) {
      console.error('Download error:', error);
      errorDiv.textContent = `Error: ${error.message}`;
      errorDiv.classList.remove('hidden');
      downloadBtn.textContent = 'Download Video';
      downloadBtn.disabled = false;
      statusDiv.textContent = 'Failed to download';
      statusDiv.classList.remove('success');
    }
  });
});
