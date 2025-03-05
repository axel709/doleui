
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
    position: fixed;
    width: 500px;
    max-width: 400px;
    background: var(--primary-bg);
    border-radius: 16px;
    box-shadow: 0 8px 24px #0000004d, 0 0 0 1px var(--border-color);
    opacity: 0;
    z-index: 9999;
    backdrop-filter: blur(12px);
    animation: slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    height: auto;
    transform: translate(-50%, -50%);
    cursor: move;
    transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease;
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

.main_Minimize {
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
    margin-right: 5px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.main_Minimize:hover {
    background: var(--close-hover-bg);
    color: var(--close-hover-color);
}

.content {
    font-family: var(--font-family);
    padding: 5px;
    text-align: center;
    color: #9ca3af;
    cursor: default;
}

.tabs {
    display: flex;
    background-color: var(--tab-bg);
    overflow: hidden;
    cursor: default;
    padding: 4px;
    margin: 12px 16 0 16px;
    border-radius: var(--basic-radius);
    gap: 4px;
}

.tab {
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: var(--tab-text-color);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 6px;
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tab.active {
    background-color: var(--tab-active-bg);
    color: var(--tab-active-text-color);
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab.active:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    border-radius: 2px;
}

.tab:hover {
    background-color: var(--tab-hover-bg);
    transform: translateY(-1px);
}

.tab:active {
    transform: translateY(0);
}

.section {
    padding: 10px 20px;
    margin-bottom: 7px;
    text-align: left;
    background-color: var(--box-color);
    color: white;
    border-radius: 15px;
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
    height: 40px;
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
    transition: background-color 0.2s ease-in-out;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 10px;
    height: 40px;
    position: relative;
    overflow: hidden;
}

.dropdown-button:hover {
    background-color: var(--button-hover-bg);
}

.toggle-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
}

.toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.toggle-label {
    font-size: 16px;
    color: var(--text-color);
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 47px;
    height: 25.5px;
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
    border-radius: 24px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: var(--toggle-handle);
    transition: .4s;
    border-radius: 50%;
    border: 1px solid var(--secondary-bg);
}

input:checked + .toggle-slider {
    background-color: var(--toggle-bg-on);
}

input:checked + .toggle-slider:before {
    transform: translateX(20px);
}

.toggle-info {
    font-size: 14px;
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
    left: 5px;
    top: 0px;
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
    transition: background-color 0.2s ease-in-out;
    width: 100%;
    height: 40px;
    position: relative;
    overflow: hidden;
}

.button:hover {
    background-color: var(--button-hover-bg);
}

.button-info {
    display: block;
    font-size: 0.8em;
    color: var(--dropdown-info-color);
    margin-top: 5px;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: var(--tab-active-bg);
    width: 10px;
    height: 10px;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
    opacity: 0.8;
}

.main_Container.closing {
    animation: close 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

.main_Container.minified {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    transform: translate(0, 0);
    background: var(--secondary-bg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    opacity: 1;
}

.main_Container.minified .main_Header,
.main_Container.minified .tabs,
.main_Container.minified .content {
    opacity: 0;
    pointer-events: none;
}

.main_Container.minified .svg-icon {
    opacity: 1;
}

.main_Container.minified::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E") no-repeat center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.tabs, .content {
    transition: opacity 0.15s ease;
}

.svg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity 0.15s ease;
}

@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 0.8;
    }
    100% {
        transform: scale(4);
        opacity: 0;
    }
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

@keyframes close {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

@keyframes minimize {
    from {
        width: 500px;
        height: auto;
        border-radius: 16px;
    }
    to {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}

@keyframes maximize {
    from {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    to {
        width: 500px;
        height: auto;
        border-radius: 16px;
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
this.themes = {"light":{"--primary-bg":"#f8fafc","--secondary-bg":"#ffffff","--border-color":"#e2e8f0","--text-color":"#111827","--close-color":"#9ca3af","--close-hover-bg":"#f0f0f0","--close-hover-color":"#111827","--tab-bg":"#f0f0f0","--tab-active-bg":"#f8fafc","--tab-text-color":"#111827","--tab-active-text-color":"#111827","--tab-hover-bg":"#e5e7eb","--dropdown-bg":"#ffffff","--dropdown-text":"#111827","--dropdown-border":"#e2e8f0","--dropdown-info-color":"#9ca3af","--button-bg":"#ffffff","--button-text":"#111827","--button-hover-bg":"#e5e7eb","--toggle-bg-off":"#e2e8f0","--toggle-bg-on":"#4ade80","--toggle-handle":"#ffffff","--toggle-info-color":"#9ca3af","--box-color":"#f0f0f0"},"dark":{"--primary-bg":"#0f172afa","--secondary-bg":"#1e293b","--border-color":"#6366f126","--text-color":"#f8fafc","--close-color":"#94a3b8","--close-hover-bg":"#334155","--close-hover-color":"#f8fafc","--tab-bg":"#242f3f","--tab-active-bg":"#131b2e","--tab-text-color":"#e2e8f0","--tab-active-text-color":"#f8fafc","--tab-hover-bg":"#2f394a","--dropdown-bg":"#374151","--dropdown-text":"#f8fafc","--dropdown-border":"#131b2e","--dropdown-info-color":"#94a3b8","--button-bg":"#374151","--button-border":"#131b2e","--button-text":"#f8fafc","--button-hover-bg":"#2f394a","--toggle-bg-off":"#334155","--toggle-bg-on":"#4ade80","--toggle-handle":"#f8fafc","--toggle-info-color":"#94a3b8","--box-color":"#242f3f"},"pink":{"--primary-bg":"#ffe4e6","--secondary-bg":"#ffc0cb","--border-color":"#f472b540","--text-color":"#881337","--close-color":"#f590ad","--close-hover-bg":"#ffb0c9","--close-hover-color":"#881337","--tab-bg":"#ffd6e0","--tab-active-bg":"#ffe4e6","--tab-text-color":"#881337","--tab-active-text-color":"#881337","--tab-hover-bg":"#ffcdd2","--dropdown-bg":"#ffc0cb","--dropdown-text":"#881337","--dropdown-border":"#f472b540","--dropdown-info-color":"#f590ad","--button-bg":"#ffc0cb","--button-text":"#881337","--button-hover-bg":"#ffcdd2","--toggle-bg-off":"#ffb0c9","--toggle-bg-on":"#ec4899","--toggle-handle":"#ffffff","--toggle-info-color":"#f590ad","--box-color":"#ffd6e0"},"Green":{"--primary-bg":"#d9ead3","--secondary-bg":"#e8f2e4","--border-color":"#bbdab0","--text-color":"#518551","--close-color":"#d9ead3","--close-hover-bg":"#d9ead3","--close-hover-color":"#e8f2e4","--tab-bg":"#cde5c5","--tab-active-bg":"#d9ead3","--tab-text-color":"#b5d3aa","--tab-active-text-color":"#518551","--tab-hover-bg":"#93c47d","--dropdown-bg":"#e8f2e4","--dropdown-text":"#518551","--dropdown-border":"#bbdab0","--dropdown-info-color":"#518551","--button-bg":"#e8f2e4","--button-border":"#bbdab0","--button-text":"#518551","--button-hover-bg":"#518551","--toggle-bg-off":"#afd3a3","--toggle-bg-on":"#518551","--toggle-handle":"#ffffff","--toggle-info-color":"#518551","--box-color":"#cde5c5"},"Purple":{"--primary-bg":"#523e85","--secondary-bg":"#291f42","--border-color":"#755cb3","--text-color":"#755cb3","--close-color":"#755cb3","--close-hover-bg":"#755cb3","--close-hover-color":"#755cb3","--tab-bg":"#4d3a7d","--tab-active-bg":"#523e85","--tab-text-color":"#33225b","--tab-active-text-color":"#291f42","--tab-hover-bg":"#392b5d","--dropdown-bg":"#291f42","--dropdown-text":"#755cb3","--dropdown-border":"#1f133b","--dropdown-info-color":"#212121","--button-bg":"#291f42","--button-border":"#1f133b","--button-text":"#755cb3","--button-hover-bg":"#1c152e","--toggle-bg-off":"#291f42","--toggle-bg-on":"#6240b9","--toggle-handle":"#ffffff","--toggle-info-color":"#291f42","--box-color":"#342163"},"Red":{"--primary-bg":"#CC0000","--secondary-bg":"#a30000","--border-color":"#8b0303","--text-color":"#731717","--close-color":"#8b0303","--close-hover-bg":"#8b0303","--close-hover-color":"#8b0303","--tab-bg":"#b30000","--tab-active-bg":"#CC0000","--tab-text-color":"#a30000","--tab-active-text-color":"#731717","--tab-hover-bg":"#b30000","--dropdown-bg":"#920000","--dropdown-text":"#731717","--dropdown-border":"#8b0303","--dropdown-info-color":"#731717","--button-bg":"#920000","--button-border":"#8b0303","--button-text":"#731717","--button-hover-bg":"#731717","--toggle-bg-off":"#a30000","--toggle-bg-on":"#731717","--toggle-handle":"#ffffff","--toggle-info-color":"#731717","--box-color":"#b30000"},"Blue":{"--primary-bg":"#2F5F8A","--secondary-bg":"#204260","--border-color":"#172f45","--text-color":"#587ea1","--close-color":"#587ea1","--close-hover-bg":"#587ea1","--close-hover-color":"#587ea1","--tab-bg":"#2a557c","--tab-active-bg":"#2F5F8A","--tab-text-color":"#204260","--tab-active-text-color":"#204260","--tab-hover-bg":"#245077","--dropdown-bg":"#204260","--dropdown-text":"#587ea1","--dropdown-border":"#172f45","--dropdown-info-color":"#587ea1","--button-bg":"#204260","--button-border":"#172f45","--button-text":"#587ea1","--button-hover-bg":"#1c3b56","--toggle-bg-off":"#2a557c","--toggle-bg-on":"#204260","--toggle-handle":"#ffffff","--toggle-info-color":"#587ea1","--box-color":"#245077"},"Sky":{"--primary-bg":"#9fc5e8","--secondary-bg":"#cfe2f3","--border-color":"#c0dbf3","--text-color":"#74a0c9","--close-color":"#74a0c9","--close-hover-bg":"#9fc5e8","--close-hover-color":"#cfe2f3","--tab-bg":"#93bce1","--tab-active-bg":"#9fc5e8","--tab-text-color":"#74a0c9","--tab-active-text-color":"#cfe2f3","--tab-hover-bg":"#81add6","--dropdown-bg":"#cfe2f3","--dropdown-text":"#74a0c9","--dropdown-border":"#81add6","--dropdown-info-color":"#74a0c9","--button-bg":"#cfe2f3","--button-border":"#81add6","--button-text":"#74a0c9","--button-hover-bg":"#81add6","--toggle-bg-off":"#81add6","--toggle-bg-on":"#5898d3","--toggle-handle":"#ffffff","--toggle-info-color":"#74a0c9","--box-color":"#95bde1"},"Orange":{"--primary-bg":"#ffbc69","--secondary-bg":"#f07f0a","--border-color":"#ffac44","--text-color":"#cf6900","--close-color":"#ffac44","--close-hover-bg":"#cf6900","--close-hover-color":"#f07f0a","--tab-bg":"#ffa739","--tab-active-bg":"#ffbc69","--tab-text-color":"#cf6900","--tab-active-text-color":"#f07f0a","--tab-hover-bg":"#da8722","--dropdown-bg":"#f07f0a","--dropdown-text":"#ffac44","--dropdown-border":"#e67500","--dropdown-info-color":"#cf6900","--button-bg":"#f07f0a","--button-border":"#e67500","--button-text":"#ffac44","--button-hover-bg":"#cf6900","--toggle-bg-off":"#f39e35","--toggle-bg-on":"#ff8200","--toggle-handle":"#ffffff","--toggle-info-color":"#ffac44","--box-color":"#ffa739"},"Barbie":{"--primary-bg":"#ff9ed0","--secondary-bg":"#d6208b","--border-color":"#aa0064","--text-color":"#aa0064","--close-color":"#fb1b9e","--close-hover-bg":"#fb1b9e","--close-hover-color":"#d6208b","--tab-bg":"#ff85c4","--tab-active-bg":"#ff9ed0","--tab-text-color":"#aa0064","--tab-active-text-color":"#d6208b","--tab-hover-bg":"#e577b0","--dropdown-bg":"#d6208b","--dropdown-text":"#aa0064","--dropdown-border":"#aa0064","--dropdown-info-color":"#aa0064","--button-bg":"#d6208b","--button-border":"#aa0064","--button-text":"#aa0064","--button-hover-bg":"#aa0064","--toggle-bg-off":"#e577b0","--toggle-bg-on":"#d6208b","--toggle-handle":"#ffffff","--toggle-info-color":"#aa0064","--box-color":"#ff85c4"},"Emo":{"--primary-bg":"#000000","--secondary-bg":"#000000","--border-color":"#c8ff4b","--text-color":"#c8ff4b","--close-color":"#c8ff4b","--close-hover-bg":"#000000","--close-hover-color":"#c8ff4b","--tab-bg":"#000000","--tab-active-bg":"#000000","--tab-text-color":"#c8ff4b","--tab-active-text-color":"#c8ff4b","--tab-hover-bg":"#000000","--dropdown-bg":"#000000","--dropdown-text":"#c8ff4b","--dropdown-border":"#c8ff4b","--dropdown-info-color":"#c8ff4b","--button-bg":"#000000","--button-border":"#c8ff4b","--button-text":"#c8ff4b","--button-hover-bg":"#c8ff4b","--toggle-bg-off":"#212121","--toggle-bg-on":"#c8ff4b","--toggle-handle":"#000000","--toggle-info-color":"#c8ff4b","--box-color":"#212121"},"Yellow":{"--primary-bg":"#fff2cc","--secondary-bg":"#ffe599","--border-color":"#ffd966","--text-color":"#f1c232","--close-color":"#ffd966","--close-hover-bg":"#ffd966","--close-hover-color":"#ffe599","--tab-bg":"#ffecb3","--tab-active-bg":"#fff2cc","--tab-text-color":"#ffd966","--tab-active-text-color":"#ffe599","--tab-hover-bg":"#ffe69a","--dropdown-bg":"#ffe599","--dropdown-text":"#ffd966","--dropdown-border":"#ffd966","--dropdown-info-color":"#f1c232","--button-bg":"#ffe599","--button-border":"#ffd966","--button-text":"#ffd966","--button-hover-bg":"#ffd966","--toggle-bg-off":"#ffe599","--toggle-bg-on":"#f1c232","--toggle-handle":"#ffffff","--toggle-info-color":"#ffd966","--box-color":"#ffecb3"},"AM":{"--primary-bg":"#1d1d1d","--secondary-bg":"#494949","--border-color":"#151515","--text-color":"#928400","--close-color":"#151515","--close-hover-bg":"#151515","--close-hover-color":"#151515","--tab-bg":"#212121","--tab-active-bg":"#1d1d1d","--tab-text-color":"#0f0f0f","--tab-active-text-color":"#494949","--tab-hover-bg":"#111111","--dropdown-bg":"#494949","--dropdown-text":"#151515","--dropdown-border":"#151515","--dropdown-info-color":"#928400","--button-bg":"#494949","--button-border":"#151515","--button-text":"#151515","--button-hover-bg":"#1d1d1d","--toggle-bg-off":"#494949","--toggle-bg-on":"#928400","--toggle-handle":"#111111","--toggle-info-color":"#928400","--box-color":"#212121"}};
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

    window.doleui = new UI();
})();
