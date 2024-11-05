class te {
    constructor(tp) {   
        this.tR = '';
        try { // Vault Environment
            this.vault = app.vault; // Vault API
            this.fs = this.vault.adapter.fs; // FS API
            this.path = this.vault.adapter.path; // path API
            this.tp = tp; // Templater API
            this.basePath = this.vault.adapter.basePath; // absolute path of Vault.
            this.state = "vault";

            // Wrapping tp(templater) to use all the functions in templater.
            this.file = tp.file;
            this.config = tp.config;
            this.date = tp.date;
            this.frontmatter = tp.frontmatter;
            this.hooks = tp.hooks;
            this.system = tp.system;
            this.web = tp.web;
            this.obsidian = tp.obsdiian;

        } catch (e) { //nodeJS Environment for testing.
            this.fs = require('fs');
            this.state = "nodejs";
        }
    }
    __report(msg) {
        console.error(msg);
        this.tR += msg
    }

    getFrontmatter(path) {
        // get the frontmatter of a file using absolute path. returns frontmatter in JS Object.

        let frontmatter = {}
        if (this.fs.existsSync(path)) {
            const fileContent = this.fs.readFileSync(path, 'utf-8'); // reads File
            const frontmatterMatch = fileContent.match(/^---([\s\S]*?)---/); // find frontmatter using regex 
            if(frontmatterMatch) {
                let frontmatterArray = frontmatterMatch[1].split('\n').slice(1, -1); // Slice to eleminate \n of each side.
                for(let i=0; i<frontmatterArray.length; i++) {
                    let [key, value] = frontmatterArray[i].split(":");
                    value = value.trim(); // whitespace remove
                    frontmatter[key] = value;
                }
            } else {
                this.__report("ERR: frontmatter does not exist or match error.");
                return null;
            }

        } else {
            this.__report("ERR: file does not exist.");
            return null;
        }

        return frontmatter;
    }

    saveFrontmatter(path, frontmatter) {
        // replace Note's frontmatter After a timeout.
        // timeout is required to prevent the failure to save frontmatter when This code and target's path is same.

        const TIMEOUT = 100;

        if (this.fs.existsSync(path)) {

            setTimeout(() => {
                    const fileContent = this.fs.readFileSync(path, 'utf8'); // read File
                    const frontmatterContent = Object.entries(frontmatter).map(([key, value]) => `${key}: ${value}`).join('\n'); // Content of new Frontmatter.
                    let newContent = fileContent.replace(/^---([\s\S]*?)---/, `---\n${frontmatterContent}\n---`); // Note Content to replace.
                    this.fs.writeFileSync(path, newContent, 'utf8');// write File.
                }, TIMEOUT);
        }
    }

    getFilePath(filename) {
        // search for a file and returns its absolute path.
        const updatefilePath = tp.file.find_tfile(filename).path;
        const absolutePath = this.path.join(this.basePath, updatefilePath);
        return absolutePath
    }

}

tp = new te(tp);