const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'lib', 'style.css');
const jsPath = path.join(__dirname, 'lib', 'ui.js');
const themesPath = path.join(__dirname, 'lib', 'themes.json');
const binPath = path.join(__dirname, '..', 'bin');
const examplePath = path.join(__dirname, '..', 'example');

const gitHubBaseUrl = "https://raw.githubusercontent.com/axel709/doleui/main/bin/doleui.js";

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
js = js.slice(0, constructorIndex + 'constructor(title, theme) {'.length) +
     themesCode +
     js.slice(constructorIndex + 'constructor(title, theme) {'.length);

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
(async () => {
    try {
        const response = await fetch("${gitHubBaseUrl}");
        if (!response.ok) throw new Error(\`Failed to load script: \${response.statusText}\`);
        
        const scriptText = await response.text();
        eval(scriptText);

        if (typeof doleui !== "undefined") {

            // You can edit the code below to create your own UI
            
            const mainWindow = doleui.createWindow("Main Window", "dark");
            const tab1 = mainWindow.addTab("Tab 1");
            const tab2 = mainWindow.addTab("Tab 2");
            const section1 = mainWindow.addSection(tab1, "Section A");
            const section2 = mainWindow.addSection(tab2, "Section B");
            const section3 = mainWindow.addSection(tab2, "Section C");
            const section4 = mainWindow.addSection(tab2, "Section D");

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

            mainWindow.addToggle(
                section2,
                "Toggle Feature",
                "Enable or disable this feature",
                false,
                function(isChecked) {
                    console.log("Toggle state:", isChecked);
                }
            );

            mainWindow.addCheckbox(
                section3,
                "Toggle CheckBox",
                "Enable or disable this feature",
                true,
                function(isChecked) {
                    console.log("Notifications enabled:", isChecked);
                }
            );

            mainWindow.addButton(
                section4,
                "Button Title",
                "Button",
                "Description, can leave this empty",
                function() {
                    console.log("Button clicked");
                }
            );

        } else {
            console.error("DoleUI is niet correct geladen.");
        }
    } catch (error) {
        console.error("Fout bij het laden van DoleUI:", error);
    }
})();
`;

fs.mkdirSync(binPath, { recursive: true });
fs.mkdirSync(examplePath, { recursive: true });

fs.writeFileSync(path.join(binPath, 'doleui.js'), combined);
fs.writeFileSync(path.join(examplePath, 'example.js'), example);

console.log('DoleUI library built successfully!');
