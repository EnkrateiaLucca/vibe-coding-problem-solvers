# Instagram Video Downloader - Chrome Extension

A Chrome extension that allows you to download Instagram videos directly from your browser.

## Features

- ✅ Download videos from Instagram posts
- ✅ Works on Reels, feed posts, and IGTV
- ✅ Simple one-click download
- ✅ Choose where to save files
- ✅ Clean, modern interface

## Installation Instructions

### Method 1: Load Unpacked Extension (Developer Mode)

1. **Download the Extension Files**
   - Download all the files in this folder to your computer
   - Keep them all in the same folder

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Go to `chrome://extensions/` in your address bar
   - Or: Click the three dots (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the folder containing the extension files
   - Select the folder and click "Select Folder"

5. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in Chrome toolbar
   - Find "Instagram Video Downloader"
   - Click the pin icon to keep it visible

## How to Use

1. **Navigate to Instagram**
   - Go to https://www.instagram.com
   - Log in to your account

2. **Open a Post with Video**
   - Click on any post that contains a video
   - This works for regular posts, Reels, and IGTV videos

3. **Download the Video**
   - Click the extension icon in your browser toolbar
   - Click the "Download Video" button
   - Choose where to save the file
   - The video will download to your selected location

## Troubleshooting

### "No video found" Error
- Make sure you're on an Instagram post page with a video
- Try refreshing the page and clicking the extension again
- Some private or restricted videos may not be downloadable

### Extension Not Working
- Make sure you're logged into Instagram
- Try disabling and re-enabling the extension
- Reload the Instagram page
- Check that the extension has the necessary permissions

### Download Not Starting
- Check your Chrome download settings
- Make sure pop-ups aren't blocked
- Try a different video

## Technical Details

**Permissions Used:**
- `activeTab` - To access the current Instagram tab
- `downloads` - To download the video file
- `host_permissions` - To run on Instagram pages only

**Files Included:**
- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.css` - Styling for the popup
- `popup.js` - Popup logic
- `content.js` - Script that runs on Instagram pages
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons

## Privacy & Safety

- [Inference] This extension only runs on Instagram pages
- [Inference] It does not collect or transmit any personal data
- [Inference] It only accesses the video URL from the current page
- All processing happens locally in your browser

## Limitations

- [Unverified] Some videos may be protected or have restrictions
- [Unverified] Private account videos require you to be logged in and have access
- The extension works with Chrome's built-in download manager

## Notes

- This extension is for personal use only
- Respect copyright and Instagram's terms of service
- Downloaded videos should not be redistributed without permission

## Support

If you encounter issues:
1. Check that you're using the latest version of Chrome
2. Make sure the extension has proper permissions
3. Try reloading the extension from chrome://extensions/

---

**Version:** 1.0.0  
**Compatible with:** Chrome (Manifest V3)
