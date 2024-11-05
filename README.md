Simple Templater Extension: Adds more functions for templater.

Since this code is a wrapper of templater, you can use templater's `tp` noramlly.
## How to Use Extension
1. Copy a code of [min.md](https://raw.githubusercontent.com/gusfhr777/templater-extension/refs/heads/main/min.md)
2. paste it into `<%*   %>` placeholder in your template.

## Functions
- tp.getFilePath(filename)
	- search for a file and returns its absolute path.
- saveFrontmatter(path, frontmatter)
	- replace Note's frontmatter After a timeout.
- getFrontmatter(path)
	- get the frontmatter of a file using absolute path. returns frontmatter in JS Object.
  
