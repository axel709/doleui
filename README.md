# Customizable Draggable Windows

This project provides a simple way to create customizable, draggable windows in a web browser. It uses HTML, CSS, and JavaScript to generate windows with titles, close buttons, and drag functionality. Color themes are managed through a JSON file, allowing for easy customization of the window appearance.

## Getting Started

1.  **Download the Project:**

    You can download the project files as a zip archive and extract them, or clone the repository using Git:

    ```bash
    git clone https://github.com/axel709/doleui.git
    ```

2.  **Navigate to the Directory:**

    ```bash
    cd uilib 
    ```

3.  **Build the Project:**

    This project uses a build script to generate the final output. Run the following command:

    ```bash
    npm run build
    ```

    This command will generate the necessary files in the `output` directory.

4.  **Open `index.html` in your browser:**

    Open the `src/lib/index.html` file in your web browser. This will display the created windows.  Alternatively, you can copy the contents of `output/main.js` and paste it into your browser's developer console on a blank page (`about:blank`).

## How it Works

The project consists of the following files:

*   **`src/lib/index.html`:** The main HTML file that loads the JavaScript and CSS.
*   **`src/lib/ui.js`:** Contains the JavaScript code for creating and managing the draggable windows. It defines the `UI` class for creating windows and the `Window` class for each individual window. It handles dragging, closing, and applying themes.
*   **`src/lib/style.css`:** Contains the CSS styles for the windows. It uses CSS variables to manage colors, which are set based on the chosen theme.
*   **`src/lib/themes.json`:** A JSON file containing the color themes. Each theme defines the values for the CSS variables used in `style.css`.
*   **`output/main.js`:** The bundled JavaScript file containing the UI library, including the embedded themes.
*   **`output/example.js`:** An example script demonstrating how to create windows with different themes. This is where you would instantiate the `UI` class and create your windows.
*   **`src/lib/build.js`:** The build script to bundle the main library.

The `ui.js` script dynamically creates the window elements, applies the selected theme from `themes.json` (embedded at build time), and handles the drag and close functionality. The `example.js` file shows how to use the `UI` class to create new windows and specify their themes.

## Customization

*   **Adding/Modifying Themes:** Edit the `src/lib/themes.json` file to add new themes or modify existing ones. Each theme should define the CSS variables used in `style.css`.
*   **Creating Windows:** Use the `UI` class in your JavaScript file (e.g., `output/example.js` or in the browser's developer console) to create new windows. You can specify the title and theme for each window. For example:

    ```javascript
    const mainWindow = doleui.createWindow("Light window", "light");
    const secondWindow = doleui.createWindow("Dark window", "dark");
    const thirdWindow = doleui.createWindow("Pink window", "pink");
    ```

*   **Styling:** You can further customize the appearance of the windows by modifying the CSS in `src/lib/style.css`.

## Building

The project uses `npm run build` to create the final distributable files. The output files are generated in the `output` directory.

## Running in `about:blank`

To run the library in a blank page (`about:blank`):

1.  Open a new tab and type `about:blank` in the address bar.

2.  Open your browser's developer console (usually by pressing F12).

3.  Copy the entire contents of the `output/main.js` file.

4.  Paste the copied content into the developer console and press Enter.  This will define the `UI` and `Window` classes.

5.  Now, in the console, you can use the `doleui` object (which is the instance of the `UI` class) to create new windows:

    ```javascript
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
    ```

    Remember to replace `"dark"` with the desired theme name. You can find the themes inside src/lib/themes.json.

This approach embeds the themes data directly into the JavaScript during the build process, so no external requests are needed, making it possible to run the code in `about:blank`.
