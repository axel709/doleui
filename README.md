# DoleUI - Easy Interactive Browser Menus

DoleUI is a lightweight JavaScript library that lets you create beautiful, interactive browser menus with minimal code. Using HTML, CSS, and JavaScript, it provides draggable windows packed with tabs, sections, components like dropdowns, toggles, checkboxes, buttons, and notifications—all customizable with a simple JSON theme system. Perfect for quickly building sleek, user-friendly interfaces in the browser.

## What is DoleUI?

DoleUI simplifies the process of crafting polished browser-based menus. With just a few lines of code, you can create draggable windows filled with interactive elements, styled to your liking. Whether you're making a quick tool, a settings panel, or a custom widget, DoleUI cuts down the effort, delivering a modern UI out of the box. No complex setup—just paste one script and go.

## Getting Started

1.  **Download the Project:**

    Download the zip from GitHub or clone it:

    ```bash
    git clone https://github.com/axel709/doleui.git
    ```

2.  **Navigate to the Directory:**

    ```bash
    cd doleui
    ```

3.  **Build the Library:**

    Run the build script to create the ready-to-use files:

    ```bash
    npm run build
    ```

    This generates files in the ``bin`` and ``example`` directories.

4.  **Try It Out:**

    - Open ``src/lib/index.html`` in your browser to see DoleUI in action.
    
    - Or copy the contents of ``example/example.js``, paste it into the developer console on ``about:blank``, and watch it load everything automatically from GitHub.

## Project Structure

- **``src/lib/index.html``:** Test page for the library.

- **``src/lib/ui.js``:** Core JavaScript with ``UI`` and ``Window`` classes for creating menus.
- **``src/lib/style.css``:** CSS with themeable variables for styling.
- **``src/lib/themes.json``:** JSON file for color themes.
- **``bin/doleui.js``:** All-in-one bundled library file.
- **``example/example.js``:** Example script that fetches and uses DoleUI.
- **``src/build.js``:** Script to bundle the library.

The library creates windows dynamically, applies themes from ``themes.json``, and handles all interactivity with minimal code. The example script fetches DoleUI from GitHub and shows you how easy it is to get started.

## Features

- **Draggable Menus:** Drag windows by their header.
- **Minimizable:** Collapse into a small circle with the (-) button *(double click to open again)*.
- **Tabs & Sections:** Organize content effortlessly.
- **Interactive Components:**
  - **Dropdowns:** Pick options with a button.
  - **Toggles:** Flip switches on or off.
  - **Checkboxes:** Check or uncheck options.
  - **Buttons:** Trigger actions with a ripple effect.
- **Notifications:** Show messages with a close button (X) and 3-second timeout, matching your theme.
- **Theming:** Style everything with ``themes.json``.

## Customization

- **Themes:** Edit ``src/lib/themes.json`` to change colors.
- **Menus:** Create a window in a few lines:

    ```javascript
    const mainWindow = doleui.createWindow("My Menu", "dark");
    ```

- **Components:** Add features fast:

    ```javascript
    const tab = mainWindow.addTab("Options");
    const section = mainWindow.addSection(tab, "Controls");
    mainWindow.addDropdown(section, "Select", "Go", "Choose", ["A", "B"], console.log);
    mainWindow.addButton(section, "Notify", "Show", "Message", () => mainWindow.createNotification("Hi", "Hello there!"));
    ```

- **Styling:** Adjust ``src/lib/style.css`` for your look.

## Building

Run ``npm run build`` to generate ``bin/doleui.js`` and ``example/example.js``.

## Using DoleUI in ``about:blank``

1. Open ``about:blank`` in a new tab.
2. Open the developer console (F12).
3. Copy the contents of ``example/example.js`` (or use the script below), paste it into the console, and hit Enter—it automatically loads DoleUI from GitHub:

    ```javascript
    (async () => {
        try {
            const response = await fetch("https://raw.githubusercontent.com/axel709/doleui/main/bin/doleui.js");
            if (!response.ok) throw new Error(`Failed to load script: ${response.statusText}`);
            
            const scriptText = await response.text();
            eval(scriptText);
    
            if (typeof doleui !== "undefined") {
                const mainWindow = doleui.createWindow("Main Window", "dark");
                const tab1 = mainWindow.addTab("Tab 1");
                const tab2 = mainWindow.addTab("Tab 2");
                const section1 = mainWindow.addSection(tab1, "Section A");
                const section2 = mainWindow.addSection(tab1, "Section B");
                const section3 = mainWindow.addSection(tab2, "Section C");
                const section4 = mainWindow.addSection(tab2, "Section D");
                const section5 = mainWindow.addSection(tab2, "Section E");
    
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
    
                mainWindow.addButton(
                    section2,
                    "Notification",
                    "Show",
                    "Shows a notification",
                    function() {
                        console.log("Notification button clicked");
                        mainWindow.createNotification(
                            "Notification",
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            3000
                        );
                    }
                );
    
                mainWindow.addToggle(
                    section3,
                    "Toggle Feature",
                    "Enable or disable this feature",
                    false,
                    function(isChecked) {
                        console.log("Toggle state:", isChecked);
                    }
                );
    
                mainWindow.addCheckbox(
                    section4,
                    "Toggle CheckBox",
                    "Enable or disable this feature",
                    true,
                    function(isChecked) {
                        console.log("Checkbox enabled:", isChecked);
                    }
                );
    
                mainWindow.addButton(
                    section5,
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
    ```

Change ``"dark"`` to any theme from ``themes.json`` to switch styles.

## Ready for Release

DoleUI is packed into ``bin/doleui.js``, but you don’t even need to touch it—just grab ``example/example.js`` and paste it into your console for instant menus. It’s lightweight, dependency-free, and designed to make browser menu creation fast and fun. Add it to your projects or use it standalone with a single copy-paste!
