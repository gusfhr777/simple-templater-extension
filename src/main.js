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
        if(this.state=="nodejs") {
            this.tR += msg;
        } else {
            tR += msg;
        }
        
    }

    getFrontmatter(path) {
        // get the frontmatter of a file using absolute path. returns frontmatter in JS Object.

        let frontmatter = {}
        if (!this.fs.existsSync(path)) {
            this.__report("ERR: file does not exist.");
            return null;
        }

        const fileContent = this.fs.readFileSync(path, 'utf-8'); // reads File
        const frontmatterMatch = fileContent.match(/^---([\s\S]*?)---/); // find frontmatter using regex 
        
        if(!frontmatterMatch) {
            this.__report("ERR: frontmatter does not exist or match error.");
            return null;
        }

        return frontmatterMatch[1].split('\n').reduce((acc, line) => { // returns frontmatter
            if (line.trim() === "") return acc;
            const [key, value] = line.split(":").map(part => part.trim());
            acc[key] = value;
            return acc;
        }, {});
    }

    saveFrontmatter(path, frontmatter) {
        // replace Note's frontmatter After a timeout.
        // timeout is required to prevent the failure to save frontmatter when This code and target's path is same.

        const TIMEOUT = 100;

        if (!this.fs.existsSync(path)) {
            this.__report("ERR: file does not exist.");
        }

        setTimeout(() => {
                const fileContent = this.fs.readFileSync(path, 'utf8'); // read File
                const frontmatterContent = Object.entries(frontmatter).map(([key, value]) => `${key}: ${value}`).join('\n'); // Content of new Frontmatter.
                let newContent = fileContent.replace(/^---([\s\S]*?)---/, `---\n${frontmatterContent}\n---`); // Note Content to replace.
                this.fs.writeFileSync(path, newContent, 'utf8');// write File.
            }, TIMEOUT);
    }

    getFilePath(filename) {
        // search for a file and returns its absolute path.
        return this.path.join(this.basePath, tp.file.find_tfile(filename).path);
    }

}

tp = new te(tp);