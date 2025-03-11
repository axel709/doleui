
(async () => {
    try {
        const response = await fetch("https://raw.githubusercontent.com/axel709/doleui/main/bin/doleui.js");
        if (!response.ok) throw new Error(`Failed to load script: ${response.statusText}`);
        
        const scriptText = await response.text();
        eval(scriptText);

        if (typeof doleui !== "undefined") {

            // You can edit the code below to create your own UI
            
            const mainWindow = doleui.createWindow("Main Window", "dark");
            const tab1 = mainWindow.addTab("Tab 1");
            const tab2 = mainWindow.addTab("Tab 2");
            const tab3 = mainWindow.addTab("Tab 3");
            const section1 = mainWindow.addSection(tab1, "Section A");
            const section2 = mainWindow.addSection(tab1, "Section B");
            const section3 = mainWindow.addSection(tab2, "Section C");
            const section4 = mainWindow.addSection(tab2, "Section D");
            const section5 = mainWindow.addSection(tab2, "Section E");
            const section6 = mainWindow.addSection(tab3, "Section F");

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

            mainWindow.addLinebreak(section1);

            mainWindow.addTextInput(
                section1,
                "Text Input",
                "Enter text here",
                function(value) {
                    console.log("Text input value:", value);
                }
            );

            mainWindow.addTextarea(
                section2,
                "Textarea Input",
                "Enter longer text here",
                function(value) {
                    console.log("Textarea value:", value);
                }
            );

            mainWindow.addLinebreak(section2);

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
                "Show Modal",
                "Button",
                "Opens a modal",
                function() {
                    mainWindow.createModal(
                        "Text Modal",
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    );
                }
            );

            const listItems = [
                {
                    title: "Item 1",
                    description: "Description for item 1",
                    image: "https://placehold.co/400"
                },
                {
                    title: "Item 2",
                    description: "Description for item 2",
                    image: "https://placehold.co/400"
                },
                {
                    title: "Item 3",
                    description: "Description for item 3"
                },
                {
                    title: "Item 4",
                    description: "Description for item 4"
                },
                {
                    title: "Item 5",
                    description: "Description for item 5"
                }
            ];
            
            mainWindow.addList(section6, listItems);

        } else {
            console.error("DoleUI is niet correct geladen.");
        }
    } catch (error) {
        console.error("Fout bij het laden van DoleUI:", error);
    }
})();
