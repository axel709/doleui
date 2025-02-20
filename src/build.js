const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'src', 'lib', 'style.css');
const jsPath = path.join(__dirname, '..', 'src', 'lib', 'ui.js');
const themesPath = path.join(__dirname, '..', 'src', 'lib', 'themes.json');
const outputPath = path.join(__dirname, '..', 'output', 'main.js');
const examplePath = path.join(__dirname, '..', 'output', 'example.js');

const css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');
const themes = JSON.parse(fs.readFileSync(themesPath, 'utf8'));

const themesCode = `
this.themes = ${JSON.stringify(themes)};
this.applyTheme = function(theme) {
    if (theme && this.themes[theme]) {
        for (const variable in this.themes[theme]) {
            this.element.style.setProperty(variable, this.themes[theme][variable]);
        }
    } else {
        console.error(\`Theme "\${theme}" not found in themes.json\`);
    }
};
`;

const constructorIndex = js.indexOf('constructor(title, theme)');
if (constructorIndex === -1) {
    throw new Error('Could not find constructor in ui.js');
}

js = js.slice(0, constructorIndex + 'constructor(title, theme) {'.length) + themesCode + js.slice(constructorIndex + 'constructor(title, theme) {'.length);

const combined = `
(function() {
    const style = document.createElement('style');
    style.textContent = \`${css}\`;
    document.head.appendChild(style);
    ${js}
    window.doleui = new UI();
})();
`;

const example = `
// First Window Example
const mainWindow = doleui.createWindow("Main Window", "dark");

// tabs
const tab1 = mainWindow.addTab("Tab 1");
const tab2 = mainWindow.addTab("Tab 2");

// sections
const section1 = mainWindow.addSection(tab1, "Section A");
const section2 = mainWindow.addSection(tab2, "Section B");
const section3 = mainWindow.addSection(tab2, "Section C");
const section4 = mainWindow.addSection(tab2, "Section D");

// dropdown (section1)
mainWindow.addDropdown(
    section1,
    "Dropdown Text",
    "Button",
    "Description, can leave this empty",
    ["Option 1", "Option 2", "Option 3"],
    function(currentOption) {
        console.log("Selected option:", currentOption);
    }
);

// toggle (section2)
mainWindow.addToggle(
    section2,
    "Toggle Feature",
    "Enable or disable this feature",
    false,
    function(isChecked) {
        console.log("Toggle state:", isChecked);
    }
);

// checkBox (section3)
mainWindow.addCheckbox(
    section3,
    "Toggle CheckBox",
    "Enable or disable this feature",
    true,
    function(isChecked) {
        console.log("Notifications enabled:", isChecked);
    }
);

// button (section4)
mainWindow.addButton(
    section4,
    "Button Title",
    "Button",
    "Description, can leave this empty",
    function() {
        console.log("Button clicked");
    }
);
`;

fs.mkdirSync(path.join(__dirname, '..', 'output'), { recursive: true });
fs.writeFileSync(outputPath, combined);
fs.writeFileSync(examplePath, example);

console.log('doleui library built successfully!');
