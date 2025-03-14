class UI {
    constructor() {
        this.windows = [];
    }

    createWindow(title, theme = "dark") {
        const window = new Window(title, theme);
        this.windows.push(window);
        return window;
    }
}

class Window {
    constructor(title, theme) {
        this.title = title;
        this.theme = theme;
        this.element = document.createElement('div');
        this.element.classList.add('main_Container', theme);
        if (this.theme && this.themes[this.theme]) {
            for (const variable in this.themes[this.theme]) {
                this.element.style.setProperty(variable, this.themes[this.theme][variable]);
            }
        } else {
            console.error(`Theme "${this.theme}" not found in themes.json`);
        }

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
        this.tabIndicator = document.createElement('div');
        this.tabIndicator.classList.add('tab-indicator');
        this.tabIndicator.style.width = '0px';
        this.tabIndicator.style.left = '0px';
        this.tabsContainer.appendChild(this.tabIndicator);
        
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
            requestAnimationFrame(() => {
                this.selectTab(tab);
                this.tabIndicator.style.left = `${tab.offsetLeft}px`;
                this.tabIndicator.style.width = `${tab.offsetWidth}px`;
            });
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
        this.tabIndicator.style.left = `${selectedTab.offsetLeft}px`;
        this.tabIndicator.style.width = `${selectedTab.offsetWidth}px`;
    }

    addSection(tab, sectionName) {
        const section = document.createElement('div');
        section.classList.add('section');
    
        const sectionHeader = document.createElement('div');
        sectionHeader.classList.add('section-header');
    
        const sectionTitle = document.createElement('div');
        sectionTitle.classList.add('section-title');
        sectionTitle.textContent = sectionName;
        sectionHeader.appendChild(sectionTitle);
    
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('section-toggle');
        toggleButton.textContent = '−';
        sectionHeader.appendChild(toggleButton);
    
        const sectionContent = document.createElement('div');
        sectionContent.classList.add('section-content');
    
        section.appendChild(sectionHeader);
        section.appendChild(sectionContent);
        tab.tabContent.appendChild(section);
    
        let isMinified = false;
    
        section.style.height = 'auto';
        section.style.overflow = 'hidden';
    
        toggleButton.addEventListener('click', () => {
            if (!isMinified) {
                const headerHeight = sectionHeader.offsetHeight;
                const fullHeight = section.scrollHeight;
                section.style.height = `${fullHeight}px`;
                sectionContent.style.opacity = '0';
                requestAnimationFrame(() => {
                    section.style.height = `45px`;
                    toggleButton.textContent = '+';
                });
                section.addEventListener('transitionend', () => {
                    if (section.style.height === `${headerHeight}px`) {
                        section.classList.add('minified');
                    }
                }, { once: true });
            } else {
                const headerHeight = sectionHeader.offsetHeight;
                const fullHeight = sectionContent.scrollHeight + headerHeight;
                section.classList.remove('minified');
                section.style.height = `${headerHeight}px`; 
                requestAnimationFrame(() => {
                    section.style.height = `${fullHeight}px`;
                    sectionContent.style.opacity = '1';
                    toggleButton.textContent = '−';
                });
                section.addEventListener('transitionend', () => {
                    if (section.style.height === `${fullHeight}px`) {
                        section.style.height = 'auto';
                    }
                }, { once: true });
            }
            isMinified = !isMinified;
        });
    
        section.contentContainer = sectionContent;
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
        section.contentContainer.appendChild(dropdownContainer);
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
    
        section.contentContainer.appendChild(toggleContainer);
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
        
        section.contentContainer.appendChild(checkboxContainer);
        return checkboxContainer;
    }

    addButton(section, buttonTitle, buttonText, buttonInfo, callback) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('uiButton-container');
    
        const buttonLabel = document.createElement('label');
        buttonLabel.textContent = buttonTitle;
        buttonLabel.classList.add('button-label');
        buttonContainer.appendChild(buttonLabel);
    
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.classList.add('uiButton');
    
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
        buttonInfoElement.classList.add('uiButton-info');
        buttonContainer.appendChild(buttonInfoElement);
    
        section.contentContainer.appendChild(buttonContainer);
        return buttonContainer;
    }

    addTextInput(section, labelText, placeholder = '', callback) {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('text-input-container');

        const inputLabel = document.createElement('label');
        inputLabel.textContent = labelText;
        inputLabel.classList.add('text-input-label');
        inputContainer.appendChild(inputLabel);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.classList.add('text-input');

        input.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
                return;
            }

            if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                if (e.key.length === 1) {
                    e.preventDefault();
                    input.value = input.value + e.key;
                } else if (e.key === 'Backspace') {
                    e.preventDefault();
                    input.value = input.value.slice(0, -1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    callback(input.value);
                }
            }
        });

        input.addEventListener('input', () => {
            callback(input.value);
        });

        inputContainer.appendChild(input);
        section.contentContainer.appendChild(inputContainer);
        return inputContainer;
    }

    addTextarea(section, labelText, placeholder = '', callback) {
        const textareaContainer = document.createElement('div');
        textareaContainer.classList.add('textarea-container');

        const textareaLabel = document.createElement('label');
        textareaLabel.textContent = labelText;
        textareaLabel.classList.add('textarea-label');
        textareaContainer.appendChild(textareaLabel);

        const textarea = document.createElement('textarea');
        textarea.placeholder = placeholder;
        textarea.classList.add('textarea-input');

        textarea.addEventListener('keydown', (e) => {
            if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
                return;
            }

            if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                if (e.key.length === 1) {
                    e.preventDefault();
                    textarea.value = textarea.value + e.key;
                } else if (e.key === 'Backspace') {
                    e.preventDefault();
                    textarea.value = textarea.value.slice(0, -1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    textarea.value = textarea.value + '\n';
                }
            }
        });

        textarea.addEventListener('input', () => {
            callback(textarea.value);
        });

        textareaContainer.appendChild(textarea);
        section.contentContainer.appendChild(textareaContainer);
        return textareaContainer;
    }

    createNotification(title, message, duration = 3000) {
        const notificationContainer = document.querySelector('.notification-container') || this.createNotificationContainer();
        
        const notification = document.createElement('div');
        notification.classList.add('notification');
        
        if (this.theme && this.themes[this.theme]) {
            for (const variable in this.themes[this.theme]) {
                notification.style.setProperty(variable, this.themes[this.theme][variable]);
            }
        } else {
            console.error(`Theme "${this.theme}" not found in themes.json`);
        }
        
        notification.innerHTML = `
            <span class="notification-title">${title}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        `;
        
        notificationContainer.appendChild(notification);
        
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            notification.classList.add('closing');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        });
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('closing');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, duration);

        return notification;
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.classList.add('notification-container');
        document.body.appendChild(container);
        return container;
    }

    createModal(title, description) {
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        overlay.style.pointerEvents = 'auto';

        const modal = document.createElement('div');
        modal.classList.add('modal');

        if (this.theme && this.themes[this.theme]) {
            for (const variable in this.themes[this.theme]) {
                modal.style.setProperty(variable, this.themes[this.theme][variable]);
            }
        }

        modal.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close">×</button>
            </div>
            <div class="modal-description">${description}</div>
            <div class="modal-content"></div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const closeModal = () => {
            modal.classList.remove('show');
            modal.classList.add('closing');
            modal.addEventListener('transitionend', () => {
                overlay.remove();
            }, { once: true });
        };

        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', closeModal);

        requestAnimationFrame(() => {
            modal.classList.add('show');
        });

        modal.content = modal.querySelector('.modal-content');
        modal.addDropdown = this.addDropdown.bind(this);
        modal.addToggle = this.addToggle.bind(this);
        modal.addCheckbox = this.addCheckbox.bind(this);
        modal.addButton = this.addButton.bind(this);

        return modal;
    }

    addList(section, items) {
        const listContainer = document.createElement('div');
        listContainer.classList.add('list-container');

        items.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');

            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image;
                img.classList.add('list-item-image');
                listItem.appendChild(img);
            }

            const textContainer = document.createElement('div');
            textContainer.classList.add('list-item-text');

            const title = document.createElement('div');
            title.classList.add('list-item-title');
            title.textContent = item.title;
            textContainer.appendChild(title);

            const description = document.createElement('div');
            description.classList.add('list-item-description');
            description.textContent = item.description;
            textContainer.appendChild(description);

            listItem.appendChild(textContainer);
            listContainer.appendChild(listItem);
        });

        section.contentContainer.appendChild(listContainer);
        return listContainer;
    }

    addLinebreak(section) {
        const linebreak = document.createElement('div');
        linebreak.classList.add('linebreak');
        section.contentContainer.appendChild(linebreak);
        return linebreak;
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
        const top = (windowHeight - elementHeight) / 2 - elementHeight * 5;

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
