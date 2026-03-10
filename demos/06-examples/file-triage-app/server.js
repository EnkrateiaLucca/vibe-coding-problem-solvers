const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.static(__dirname));

// Supported file types by category
const FILE_CATEGORIES = {
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico', '.tiff', '.heic'],
  document: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
  text: ['.md', '.txt', '.json', '.xml', '.csv', '.log', '.yaml', '.yml'],
  code: ['.js', '.ts', '.jsx', '.tsx', '.py', '.html', '.css', '.scss', '.sh', '.rb', '.go', '.rs', '.java', '.c', '.cpp', '.h'],
  video: ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'],
  audio: ['.mp3', '.wav', '.aac', '.flac', '.m4a', '.ogg']
};

// Get file category
function getFileCategory(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
    if (extensions.includes(ext)) return category;
  }
  return 'other';
}

// Check if file should be included (skip hidden files and system files)
function shouldIncludeFile(fileName) {
  if (fileName.startsWith('.')) return false;
  if (fileName === 'desktop.ini' || fileName === 'Thumbs.db') return false;
  return true;
}

// Load all files from a folder
app.post('/api/load-files', async (req, res) => {
  try {
    const { folderPath, filterCategory } = req.body;
    const resolvedPath = path.resolve(folderPath);

    const stat = await fs.stat(resolvedPath);
    if (!stat.isDirectory()) {
      return res.status(400).json({ success: false, error: 'Path is not a directory' });
    }

    const entries = await fs.readdir(resolvedPath, { withFileTypes: true });

    let files = entries
      .filter(entry => entry.isFile() && shouldIncludeFile(entry.name))
      .map(entry => {
        const category = getFileCategory(entry.name);
        return {
          name: entry.name,
          path: path.join(resolvedPath, entry.name),
          category,
          ext: path.extname(entry.name).toLowerCase()
        };
      });

    // Filter by category if specified
    if (filterCategory && filterCategory !== 'all') {
      files = files.filter(f => f.category === filterCategory);
    }

    // Sort alphabetically
    files.sort((a, b) => a.name.localeCompare(b.name));

    res.json({ success: true, files, sourcePath: resolvedPath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve file content
app.get('/api/file', async (req, res) => {
  try {
    const filePath = req.query.path;
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get text file content
app.get('/api/file-content', async (req, res) => {
  try {
    const filePath = req.query.path;
    const content = await fs.readFile(filePath, 'utf-8');
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get file info (size, modified date)
app.get('/api/file-info', async (req, res) => {
  try {
    const filePath = req.query.path;
    const stat = await fs.stat(filePath);
    res.json({
      success: true,
      size: stat.size,
      modified: stat.mtime,
      created: stat.birthtime
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Move file to temp folder (mark for deletion)
app.post('/api/mark-delete', async (req, res) => {
  try {
    const { sourcePath, filePath } = req.body;
    const tempFolder = path.join(sourcePath, '.triage_delete');

    await fs.mkdir(tempFolder, { recursive: true });

    const fileName = path.basename(filePath);
    const tempPath = path.join(tempFolder, fileName);

    await fs.rename(filePath, tempPath);

    res.json({ success: true, tempPath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Move file to a destination folder
app.post('/api/move-file', async (req, res) => {
  try {
    const { sourcePath, filePath, destFolder, createIfMissing } = req.body;

    // Resolve destination path
    let destPath;
    if (path.isAbsolute(destFolder)) {
      destPath = destFolder;
    } else {
      destPath = path.join(sourcePath, destFolder);
    }

    // Create destination folder if needed
    if (createIfMissing) {
      await fs.mkdir(destPath, { recursive: true });
    }

    // Check destination exists
    try {
      const stat = await fs.stat(destPath);
      if (!stat.isDirectory()) {
        return res.status(400).json({ success: false, error: 'Destination is not a folder' });
      }
    } catch (error) {
      return res.status(400).json({ success: false, error: 'Destination folder does not exist' });
    }

    const fileName = path.basename(filePath);
    const newPath = path.join(destPath, fileName);

    // Check if file already exists at destination
    try {
      await fs.access(newPath);
      return res.status(400).json({ success: false, error: 'File already exists at destination' });
    } catch {
      // File doesn't exist, good to proceed
    }

    await fs.rename(filePath, newPath);

    res.json({ success: true, newPath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Restore file from temp folder
app.post('/api/restore', async (req, res) => {
  try {
    const { sourcePath, fileName } = req.body;
    const tempFolder = path.join(sourcePath, '.triage_delete');
    const tempPath = path.join(tempFolder, fileName);
    const originalPath = path.join(sourcePath, fileName);

    await fs.rename(tempPath, originalPath);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get files marked for deletion
app.post('/api/get-marked', async (req, res) => {
  try {
    const { sourcePath } = req.body;
    const tempFolder = path.join(sourcePath, '.triage_delete');

    try {
      const entries = await fs.readdir(tempFolder);
      const files = entries.map(name => ({
        name,
        path: path.join(tempFolder, name),
        category: getFileCategory(name)
      }));
      res.json({ success: true, files });
    } catch (error) {
      res.json({ success: true, files: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Confirm deletion (permanently delete)
app.post('/api/confirm-delete', async (req, res) => {
  try {
    const { sourcePath } = req.body;
    const tempFolder = path.join(sourcePath, '.triage_delete');

    await fs.rm(tempFolder, { recursive: true, force: true });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Cancel deletion (restore all files)
app.post('/api/cancel-delete', async (req, res) => {
  try {
    const { sourcePath } = req.body;
    const tempFolder = path.join(sourcePath, '.triage_delete');

    try {
      const files = await fs.readdir(tempFolder);
      for (const file of files) {
        const tempPath = path.join(tempFolder, file);
        const originalPath = path.join(sourcePath, file);
        await fs.rename(tempPath, originalPath);
      }
      await fs.rmdir(tempFolder);
    } catch (error) {
      // Temp folder might not exist
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// List subfolders (for move destination picker)
app.post('/api/list-folders', async (req, res) => {
  try {
    const { folderPath } = req.body;
    const resolvedPath = path.resolve(folderPath);

    const entries = await fs.readdir(resolvedPath, { withFileTypes: true });

    const folders = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => ({
        name: entry.name,
        path: path.join(resolvedPath, entry.name)
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Add parent directory option
    const parentPath = path.dirname(resolvedPath);

    res.json({
      success: true,
      folders,
      currentPath: resolvedPath,
      parentPath: parentPath !== resolvedPath ? parentPath : null
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const server = app.listen(PORT, () => {
  console.log(`\n  File Triage App running at http://localhost:${PORT}`);
  console.log('  Open your browser and navigate to the URL above\n');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use.`);
    console.error(`  Run: lsof -ti:${PORT} | xargs kill -9`);
    console.error('  Then try again.\n');
    process.exit(1);
  }
  throw err;
});
