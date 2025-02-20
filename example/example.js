
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
