class UI {
    createWindow(title, theme = "dark") {
        return new Window(title, theme);
    }
}

class Window {
    constructor(title, theme) {
        this.title = title;
        this.theme = theme;
        this.element = document.createElement('div');
        this.element.classList.add('main_Container', theme);
        this.applyTheme(this.theme);
        this.element.innerHTML = `
            <div class="main_Header">
                <h1 class="main_Title">${this.title}</h1>
                <button class="main_Minimize">−</button>
                <button class="main_Close">×</button>
            </div>
            <div class="tabs"></div>
            <div class="content"></div>
        `;
    
        this.svgIcon = document.createElement('div');
        this.svgIcon.classList.add('svg-icon');
        this.svgIcon.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#ffffff'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/></svg>`;
        this.element.appendChild(this.svgIcon);
    
        this.tabsContainer = this.element.querySelector('.tabs');
        this.contentContainer = this.element.querySelector('.content');
        this.closeButton = this.element.querySelector('.main_Close');
        this.minimizeButton = this.element.querySelector('.main_Minimize');
    
        this.closeButton.addEventListener('click', () => this.close());
        this.minimizeButton.addEventListener('click', () => this.toggleMinimize());
        document.body.appendChild(this.element);
        this.centerWindow();
        this.makeDraggable();
        this.tabs = [];
        this.isMinified = false;
        this.lastPosition = { left: null, top: null };
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
        button.addEventListener('click', (e) => {
            const selectedOption = select.value;
            let rect = button.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            let diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${x - diameter / 2}px`;
            ripple.style.top = `${y - diameter / 2}px`;
            button.appendChild(ripple);
    
            setTimeout(() => {
                ripple.remove();
            }, 600);
    
            callback(selectedOption);
        });
        
        dropdownContainer.appendChild(button);
        section.appendChild(dropdownContainer);
        return dropdownContainer;
    }

    addToggle(section, toggleText, toggleInfo, initialChecked = false, callback) {
        const toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggle-container');
    
        const toggleRow = document.createElement('div');
        toggleRow.classList.add('toggle-row');
    
        const toggleLabel = document.createElement('label');
        toggleLabel.textContent = toggleText;
        toggleLabel.classList.add('toggle-label');
        toggleRow.appendChild(toggleLabel);
    
        const toggleSwitch = document.createElement('label');
        toggleSwitch.classList.add('toggle-switch');
    
        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.checked = initialChecked;
        toggleSwitch.appendChild(toggleInput);
    
        const toggleSlider = document.createElement('span');
        toggleSlider.classList.add('toggle-slider');
        toggleSwitch.appendChild(toggleSlider);
    
        toggleRow.appendChild(toggleSwitch);
        toggleContainer.appendChild(toggleRow);
    
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

    addButton(section, buttonTitle, buttonText, buttonInfo, callback) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
    
        const buttonLabel = document.createElement('label');
        buttonLabel.textContent = buttonTitle;
        buttonLabel.classList.add('button-label');
        buttonContainer.appendChild(buttonLabel);
    
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.classList.add('button');
    
        button.addEventListener('click', function (e) {
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            let diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${x - diameter / 2}px`;
            ripple.style.top = `${y - diameter / 2}px`;
            this.appendChild(ripple);
    
            setTimeout(() => {
                ripple.remove();
            }, 600);
    
            callback();
        });
    
        buttonContainer.appendChild(button);
    
        const buttonInfoElement = document.createElement('span');
        buttonInfoElement.textContent = buttonInfo;
        buttonInfoElement.classList.add('button-info');
        buttonContainer.appendChild(buttonInfoElement);
    
        section.appendChild(buttonContainer);
        return buttonContainer;
    }

    toggleMinimize() {
        if (!this.isMinified) {
            this.tabsContainer.style.opacity = '0';
            this.contentContainer.style.opacity = '0';
            this.element.querySelector('.main_Header').style.opacity = '0';
    
            setTimeout(() => {
                this.element.classList.add('minified');
                this.lastPosition = {
                    left: this.element.style.left,
                    top: this.element.style.top
                };
                this.element.style.transform = 'none';
            }, 150);
        } else {
            const currentLeft = this.element.style.left;
            const currentTop = this.element.style.top;
    
            this.element.classList.remove('minified');
            this.svgIcon.style.opacity = '0';
    
            this.element.style.left = currentLeft;
            this.element.style.top = currentTop;
            this.element.style.transform = 'none';
    
            setTimeout(() => {
                this.tabsContainer.style.opacity = '1';
                this.contentContainer.style.opacity = '1';
                this.element.querySelector('.main_Header').style.opacity = '1';
                this.lastPosition = {
                    left: currentLeft,
                    top: currentTop
                };
            }, 300);
        }
        this.isMinified = !this.isMinified;
    }

    makeDraggable() {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = this.element.querySelector('.main_Header');
        let isDragging = false;

        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            isDragging = true;
        };

        const elementDrag = (e) => {
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
            setTimeout(() => { isDragging = false; }, 100);
        };

        header.onmousedown = dragMouseDown;

        this.element.addEventListener('mousedown', (e) => {
            if (this.isMinified && e.target === this.element) {
                dragMouseDown(e);
            }
        });

        this.element.addEventListener('click', (e) => {
            if (this.isMinified && e.target === this.element && !isDragging) {
                this.toggleMinimize();
            }
        });
    }

    centerWindow() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const elementWidth = this.element.offsetWidth;
        const elementHeight = this.element.offsetHeight;
        const left = (windowWidth - elementWidth) / 2;
        const top = (windowHeight - elementHeight) / 2 - elementHeight * 1.5;

        this.element.style.left = `${left}px`;
        this.element.style.top = `${top > 0 ? top : 0}px`;
    }

    close() {
        this.element.classList.add('closing');
        this.element.style.animation = 'close 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            this.element.remove();
        }, 200);
    }
}
