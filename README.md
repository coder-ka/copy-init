# copy-init

When you make project with some configuration and make it boilerplate and example and demo.

Easiest answer is copy neccesary files.

So define mandatory files for your boilerplate package. e.g. `@your-name/create-<package-name>`

Make `boilerplate-files.json` in your boilerplate's root.

```
my-boilerplate -- src/
               ├ .git/
               ├ .gitignore
               ├ package.json
               ├ README.md
               ├ webpack.config.js
               ┗ [*] boilerplate-files.json
```

you can specify files with **glob syntax**.

`boilerplate-files.json`

```json
{
  "files": [
    "src/index.js",
    "src/index.html",
    "src/**/*.css",
    ".gitignore",
    "package.json",
    "webpack.config.js"
  ]
}
```

Run below command and required files should be copied.

```bash
npm install -g copy-init

cd <path/to/my/awesome-starting-project>

copy-init <path/to/my/boilerplate>
```

## Programmatically usage

```javascript
const { copyFiles } = require("@coder-ka/copy-init");

// returns Promise
copyFiles("path/to/my/boilerplate");
```
