Simple Templater Extension: Adds more functions for templater.

Since this code is a wrapper of templater, you can use templater's `tp` noramlly.
## How to Use Extension
1. Copy a code of [min.js](https://raw.githubusercontent.com/gusfhr777/templater-extension/refs/heads/main/src/min.js)
2. paste it into your template.

## Functions
- tp.getFilePath(filename)
	- search for a file and returns its absolute path.
- tp.saveFrontmatter(path, frontmatter)
	- replace Note's frontmatter After a timeout.
- tp.getFrontmatter(path)
	- get the frontmatter of a file using absolute path. returns frontmatter in JS Object.
  
