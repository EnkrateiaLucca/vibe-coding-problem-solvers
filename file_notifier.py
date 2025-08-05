#!/usr/bin/env -S uv run --script
# /// script
# dependencies = [
#   "plyer>=2.1.0",
#   "pyobjus>=1.2.0; sys_platform == 'darwin'",
# ]
# requires-python = ">=3.8"
# ///

"""
File Notifier Script - System notification about files in a folder
Usage: python file_notifier.py /path/to/folder
"""

import sys
import os
from pathlib import Path
from plyer import notification


def get_folder_info(folder_path):
    """Get information about files in the specified folder."""
    try:
        folder = Path(folder_path)
        
        if not folder.exists():
            return None, f"Folder '{folder_path}' does not exist"
        
        if not folder.is_dir():
            return None, f"'{folder_path}' is not a directory"
        
        # Get all files (not directories)
        files = [f for f in folder.iterdir() if f.is_file()]
        dirs = [d for d in folder.iterdir() if d.is_dir()]
        
        # Calculate total size
        total_size = sum(f.stat().st_size for f in files)
        
        # Get file extensions
        extensions = {}
        for file in files:
            ext = file.suffix.lower() or 'no extension'
            extensions[ext] = extensions.get(ext, 0) + 1
        
        return {
            'folder_name': folder.name,
            'total_files': len(files),
            'total_dirs': len(dirs),
            'total_size': total_size,
            'extensions': extensions,
            'recent_files': sorted(files, key=lambda x: x.stat().st_mtime, reverse=True)[:5]
        }, None
        
    except PermissionError:
        return None, f"Permission denied accessing '{folder_path}'"
    except Exception as e:
        return None, f"Error accessing folder: {str(e)}"


def format_size(size_bytes):
    """Convert bytes to human readable format."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def create_notification_message(info):
    """Create a formatted notification message."""
    title = f"📁 Folder: {info['folder_name']}"
    
    # Main stats
    message_parts = [
        f"📄 Files: {info['total_files']}",
        f"📂 Folders: {info['total_dirs']}",
        f"💾 Size: {format_size(info['total_size'])}"
    ]
    
    # Top file types
    if info['extensions']:
        top_extensions = sorted(info['extensions'].items(), key=lambda x: x[1], reverse=True)[:3]
        ext_text = ", ".join([f"{ext} ({count})" for ext, count in top_extensions])
        message_parts.append(f"🏷️ Types: {ext_text}")
    
    # Recent files
    if info['recent_files']:
        recent_names = [f.name for f in info['recent_files'][:3]]
        message_parts.append(f"🕒 Recent: {', '.join(recent_names)}")
    
    return title, "\n".join(message_parts)


def send_notification(title, message):
    """Send system notification."""
    try:
        # Try plyer first
        notification.notify(
            title=title,
            message=message,
            app_name="File Notifier",
            timeout=10,  # Notification stays for 10 seconds
        )
        return True
    except Exception as e:
        print(f"Plyer notification failed: {e}")
        
        # Fallback to macOS native osascript
        try:
            import subprocess
            # Escape quotes in the message for AppleScript
            safe_title = title.replace('"', '\\"')
            safe_message = message.replace('"', '\\"')
            
            script = f'display notification "{safe_message}" with title "{safe_title}"'
            subprocess.run(['osascript', '-e', script], check=True)
            return True
        except Exception as fallback_error:
            print(f"Fallback notification also failed: {fallback_error}")
            return False


def main():
    """Main function to process folder and send notification."""
    if len(sys.argv) != 2:
        print("Usage: python file_notifier.py /path/to/folder")
        print("Example: python file_notifier.py ~/Downloads")
        sys.exit(1)
    
    folder_path = sys.argv[1]
    
    # Expand user path if needed
    folder_path = os.path.expanduser(folder_path)
    
    print(f"Analyzing folder: {folder_path}")
    
    # Get folder information
    info, error = get_folder_info(folder_path)
    
    if error:
        title = "❌ File Notifier Error"
        message = error
        print(f"Error: {error}")
    else:
        title, message = create_notification_message(info)
        print(f"Found {info['total_files']} files and {info['total_dirs']} folders")
        print(f"Total size: {format_size(info['total_size'])}")
    
    # Send notification
    if send_notification(title, message):
        print("✅ Notification sent successfully!")
    else:
        print("❌ Failed to send notification")
        # Fallback: print to console
        print(f"\n{title}")
        print(message)


if __name__ == "__main__":
    main()