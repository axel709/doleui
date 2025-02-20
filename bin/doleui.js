
// GitHub URL: https://github.com/axel709/doleui
(function() {
    const style = document.createElement('style');
    style.textContent = `:root {
    --primary-bg: #f8fafc;
    --secondary-bg: #ffffff;
    --border-color: #e2e8f0;
    --text-color: #111827;
    --close-color: #9ca3af;
    --close-hover-bg: #f0f0f0;
    --close-hover-color: #111827;
    --font-family: "Inter", system-ui, -apple-system, sans-serif;
    --basic-radius: 8px;
    --tab-bg: #f0f0f0;
    --tab-active-bg: #ffffff;
    --tab-text-color: #111827;
    --tab-active-text-color: #111827;
    --tab-hover-bg: #e5e7eb;
    --dropdown-bg: #f0f0f0;
    --dropdown-border: #e2e8f0;
    --dropdown-text: #111827;
    --dropdown-info-color: #9ca3af;
    --button-bg: #f0f0f0;
    --button-text: #111827;
    --button-hover-bg: #e5e7eb;
    --toggle-bg-off: #e2e8f0;
    --toggle-bg-on: #4ade80;
    --toggle-handle: #ffffff;
    --toggle-info-color: #9ca3af;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    transition: all 0.3s ease;
}

.main_Container {
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    max-width: 400px;
    background: var(--primary-bg);
    border-radius: 16px;
    box-shadow: 0 8px 24px #0000004d, 0 0 0 1px var(--border-color);
    opacity: 0;
    z-index: 9999;
    backdrop-filter: blur(12px);
    animation: slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transition: transform 0.5s ease, opacity 0.5s ease;
    height: auto;
    padding-bottom: 15px;
    transform: translate(-50%, -50%);
}

.main_Header {
    background: var(--secondary-bg);
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px 16px 0 0;
    cursor: move;
}

.main_Title {
    color: var(--text-color);
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    margin-left: 120px;
}

.main_Close {
    background: transparent;
    border: none;
    color: var(--close-color);
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: 18px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.main_Close:hover {
    background: var(--close-hover-bg);
    color: var(--close-hover-color);
}

.content {
    font-family: var(--font-family);
    padding: 5px;
    text-align: center;
    color: #9ca3af;
}

.tabs {
    display: flex;
    background-color: var(--tab-bg);
    overflow: hidden;
}

.tab {
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--tab-text-color);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s, color 0.2s;
    border-radius: 0;
}

.tab.active {
    background-color: var(--tab-active-bg);
    color: var(--tab-active-text-color);
    font-weight: 600;
}

.tab:hover {
    background-color: var(--tab-hover-bg);
}

.section {
    padding: 10px 20px;
    margin-bottom: 7px;
    text-align: left;
}

.section-title {
    font-size: 0.8em;
    font-weight: bold;
    color: var(--text-color);
    margin-bottom: 10px;
    text-align: left;
}

.tab-content {
    display: none;
    padding: 10px;
}

.dropdown-container {
    margin-bottom: 10px;
}

.dropdown-label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-color);
    font-size: 0.9em;
}

.dropdown-select {
    appearance: none;
    -webkit-appearance: none;
    padding: 8px 30px 8px 10px;
    border: 1px solid var(--dropdown-border);
    border-radius: var(--basic-radius);
    background-color: var(--dropdown-bg);
    color: var(--dropdown-text);
    font-size: 0.9em;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234a5568'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px top 50%;
    background-size: 16px;
    transition: border-color 0.2s;
    width: 100%;
    margin-bottom: 5px;
}

.dropdown-select:focus {
    outline: none;
    border-color: var(--tab-active-bg);
}

.dropdown-info {
    display: block;
    font-size: 0.8em;
    color: var(--dropdown-info-color);
    margin-bottom: 5px;
}

.dropdown-button {
    padding: 8px 12px;
    border: 1px solid var(--button-border);
    background-color: var(--button-bg);
    color: var(--button-text);
    border-radius: var(--basic-radius);
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.2s;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
}

.dropdown-button:hover {
    background-color: var(--button-hover-bg);
}

.toggle-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.toggle-label {
    margin-right: 10px;
    color: var(--text-color);
    font-size: 0.9em;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--toggle-bg-off);
    transition: .4s;
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: var(--toggle-handle);
    transition: .4s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: var(--toggle-bg-on);
}

input:checked + .toggle-slider:before {
    transform: translateX(20px);
}

.toggle-info {
    margin-left: 10px;
    font-size: 0.8em;
    color: var(--toggle-info-color);
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    color: var(--text-color);
    font-size: 0.9em;
    cursor: pointer;
}

.checkbox-custom {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    background-color: var(--dropdown-bg);
    border: 1px solid var(--dropdown-border);
    border-radius: 4px;
    flex-shrink: 0;
}

.checkbox-input:checked + .checkbox-label .checkbox-custom:after {
    content: "";
    position: absolute;
    display: block;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid var(--text-color);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-input:focus + .checkbox-label .checkbox-custom {
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.checkbox-text {
    line-height: 1.4;
}

.checkbox-info {
    display: block;
    font-size: 0.8em;
    color: var(--dropdown-info-color);
    margin-top: 5px;
    margin-left: 28px;
}

.button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    gap: 5px;
}


.button-label {
    color: var(--text-color);
    font-size: 0.9em;
}

.button {
    padding: 8px 12px;
    border: 1px solid var(--button-border);
    background-color: var(--button-bg);
    color: var(--button-text);
    border-radius: var(--basic-radius);
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.2s;
    width: 100%;
}

.button-info {
    display: block;
    font-size: 0.8em;
    color: var(--dropdown-info-color);
    margin-top: 5px;
}

.button:hover {
    background-color: var(--button-hover-bg);
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
    document.head.appendChild(style);
    class UI {
    createWindow(title, theme = "dark") {
        return new Window(title, theme);
    }
}

class Window {
    constructor(title, theme) {
this.themes = {"light":{"--primary-bg":"#f8fafc","--secondary-bg":"#ffffff","--border-color":"#e2e8f0","--text-color":"#111827","--close-color":"#9ca3af","--close-hover-bg":"#f0f0f0","--close-hover-color":"#111827","--tab-bg":"#f0f0f0","--tab-active-bg":"#f8fafc","--tab-text-color":"#111827","--tab-active-text-color":"#111827","--tab-hover-bg":"#e5e7eb","--dropdown-bg":"#ffffff","--dropdown-text":"#111827","--dropdown-border":"#e2e8f0","--dropdown-info-color":"#9ca3af","--button-bg":"#ffffff","--button-text":"#111827","--button-hover-bg":"#e5e7eb","--toggle-bg-off":"#e2e8f0","--toggle-bg-on":"#4ade80","--toggle-handle":"#ffffff","--toggle-info-color":"#9ca3af","--box-color":"#f0f0f0"},"dark":{"--primary-bg":"#0f172afa","--secondary-bg":"#1e293b","--border-color":"#6366f126","--text-color":"#f8fafc","--close-color":"#94a3b8","--close-hover-bg":"#334155","--close-hover-color":"#f8fafc","--tab-bg":"#242f3f","--tab-active-bg":"#131b2e","--tab-text-color":"#e2e8f0","--tab-active-text-color":"#f8fafc","--tab-hover-bg":"#2f394a","--dropdown-bg":"#374151","--dropdown-text":"#f8fafc","--dropdown-border":"#131b2e","--dropdown-info-color":"#94a3b8","--button-bg":"#374151","--button-border":"#131b2e","--button-text":"#f8fafc","--button-hover-bg":"#2f394a","--toggle-bg-off":"#334155","--toggle-bg-on":"#4ade80","--toggle-handle":"#f8fafc","--toggle-info-color":"#94a3b8","--box-color":"#242f3f"},"pink":{"--primary-bg":"#ffe4e6","--secondary-bg":"#ffc0cb","--border-color":"#f472b540","--text-color":"#881337","--close-color":"#f590ad","--close-hover-bg":"#ffb0c9","--close-hover-color":"#881337","--tab-bg":"#ffd6e0","--tab-active-bg":"#ffe4e6","--tab-text-color":"#881337","--tab-active-text-color":"#881337","--tab-hover-bg":"#ffcdd2","--dropdown-bg":"#ffc0cb","--dropdown-text":"#881337","--dropdown-border":"#f472b540","--dropdown-info-color":"#f590ad","--button-bg":"#ffc0cb","--button-text":"#881337","--button-hover-bg":"#ffcdd2","--toggle-bg-off":"#ffb0c9","--toggle-bg-on":"#ec4899","--toggle-handle":"#ffffff","--toggle-info-color":"#f590ad"}};
this.applyTheme = function(theme) {
    if (theme && this.themes[theme]) {
        for (const variable in this.themes[theme]) {
            this.element.style.setProperty(variable, this.themes[theme][variable]);
        }
    } else {
        console.error(`Theme "${theme}" not found in themes.json`);
    }
};

        this.title = title;
        this.theme = theme;
        this.element = document.createElement('div');
        this.element.classList.add('main_Container', theme);
        this.applyTheme(this.theme);
        this.element.innerHTML = `
            <div class="main_Header">
                <h1 class="main_Title">${this.title}</h1>
                <button class="main_Close">×</button>
            </div>
            <div class="tabs"></div>
            <div class="content"></div>
        `;

        this.tabsContainer = this.element.querySelector('.tabs');
        this.contentContainer = this.element.querySelector('.content');
        this.closeButton = this.element.querySelector('.main_Close');

        this.closeButton.addEventListener('click', () => this.close());
        document.body.appendChild(this.element);
        this.makeDraggable();
        this.tabs = [];
    }

    applyTheme(theme) {
        if (theme && this.themes[theme]) {
            for (const variable in this.themes[theme]) {
                this.element.style.setProperty(variable, this.themes[theme][variable]);
            }
        } else {
            console.error(`Theme "${theme}" not found in themes.json`);
        }
    }

    addTab(title) {
        const tab = document.createElement('button');
        tab.classList.add('tab');
        tab.textContent = title;
        tab.addEventListener('click', () => this.selectTab(tab));
        this.tabsContainer.appendChild(tab);
        this.tabs.push(tab);

        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-content');
        this.contentContainer.appendChild(tabContent);
        tabContent.style.display = 'none';
        tab.tabContent = tabContent;

        if (this.tabs.length === 1) {
            this.selectTab(tab); 
        }
        return tab;
    }

    selectTab(selectedTab) {
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.tabContent.style.display = 'none';
        });
        selectedTab.classList.add('active');
        selectedTab.tabContent.style.display = 'block';
    }

    addSection(tab, sectionName) {
        const section = document.createElement('div');
        section.classList.add('section');

        const sectionTitle = document.createElement('div');
        sectionTitle.classList.add('section-title');
        sectionTitle.textContent = sectionName;
        section.appendChild(sectionTitle);

        tab.tabContent.appendChild(section);
        return section;
    }

    addDropdown(section, dropdownText, buttonText, dropdownInfo, options, callback) {
        const dropdownContainer = document.createElement('div');
        dropdownContainer.classList.add('dropdown-container');

        const dropdownLabel = document.createElement('label');
        dropdownLabel.textContent = dropdownText;
        dropdownLabel.classList.add('dropdown-label');
        dropdownContainer.appendChild(dropdownLabel);

        const select = document.createElement('select');
        select.classList.add('dropdown-select');

        options.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });

        dropdownContainer.appendChild(select);

        const dropdownInfoElement = document.createElement('span');
        dropdownInfoElement.textContent = dropdownInfo;
        dropdownInfoElement.classList.add('dropdown-info');
        dropdownContainer.appendChild(dropdownInfoElement);

        const button = document.createElement('button');
        button.textContent = buttonText;
        button.classList.add('dropdown-button');
        button.addEventListener('click', () => {
            const selectedOption = select.value;
            callback(selectedOption);
        });
        dropdownContainer.appendChild(button);

        section.appendChild(dropdownContainer);
        return dropdownContainer;
    }

    addToggle(section, toggleText, toggleInfo, initialChecked = false, callback) {
        const toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggle-container');
    
        const toggleLabel = document.createElement('label');
        toggleLabel.textContent = toggleText;
        toggleLabel.classList.add('toggle-label');
        toggleContainer.appendChild(toggleLabel);
    
        const toggleSwitch = document.createElement('label');
        toggleSwitch.classList.add('toggle-switch');
        
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleSwitch.appendChild(toggleInput);
        toggleInput.checked = initialChecked;
        
        const toggleSlider = document.createElement('span');
        toggleSlider.classList.add('toggle-slider');
        toggleSwitch.appendChild(toggleSlider);
        
        toggleContainer.appendChild(toggleSwitch);
    
        const toggleInfoElement = document.createElement('span');
        toggleInfoElement.textContent = toggleInfo;
        toggleInfoElement.classList.add('toggle-info');
        toggleContainer.appendChild(toggleInfoElement);
    
        toggleInput.addEventListener('change', () => {
            callback(toggleInput.checked);
        });
    
        section.appendChild(toggleContainer);
        return toggleContainer;
    }

    addCheckbox(section, checkboxText, checkboxInfo, initialChecked = false, callback) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');
        
        const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
        
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.id = checkboxId;
        checkboxInput.classList.add('checkbox-input');
        checkboxInput.checked = initialChecked;
        checkboxContainer.appendChild(checkboxInput);
        
        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = checkboxId;
        checkboxLabel.classList.add('checkbox-label');
        
        const checkboxCustom = document.createElement('span');
        checkboxCustom.classList.add('checkbox-custom');
        checkboxLabel.appendChild(checkboxCustom);
        
        const checkboxTextSpan = document.createElement('span');
        checkboxTextSpan.classList.add('checkbox-text');
        checkboxTextSpan.textContent = checkboxText;
        checkboxLabel.appendChild(checkboxTextSpan);
        
        checkboxContainer.appendChild(checkboxLabel);
        
        if (checkboxInfo) {
            const checkboxInfoElement = document.createElement('span');
            checkboxInfoElement.textContent = checkboxInfo;
            checkboxInfoElement.classList.add('checkbox-info');
            checkboxContainer.appendChild(checkboxInfoElement);
        }
        
        checkboxInput.addEventListener('change', () => {
            callback(checkboxInput.checked);
        });
        
        section.appendChild(checkboxContainer);
        return checkboxContainer;
    }

    addButton(selection, buttonTitle, buttonText, buttonInfo, callback) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        const buttonLabel = document.createElement('label');
        buttonLabel.textContent = buttonTitle;
        buttonLabel.classList.add('button-label');
        buttonContainer.appendChild(buttonLabel);
        
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.classList.add('button');
        button.addEventListener('click', () => {
            callback();
        });
        buttonContainer.appendChild(button);
        
        const buttonInfoElement = document.createElement('span');
        buttonInfoElement.textContent = buttonInfo;
        buttonInfoElement.classList.add('button-info');
        buttonContainer.appendChild(buttonInfoElement);
        
        selection.appendChild(buttonContainer);
        return buttonContainer;
    }

    makeDraggable() {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = this.element.querySelector('.main_Header');

        const dragMouseDown = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            this.element.style.top = (this.element.offsetTop - pos2) + "px";
            this.element.style.left = (this.element.offsetLeft - pos1) + "px";
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };

        header.onmousedown = dragMouseDown;
    }

    close() {
        this.element.remove();
    }
}

    window.doleui = new UI();
})();
