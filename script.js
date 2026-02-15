// The global variables ...
let currentDevice = "Desktop"; 
const deviceLabel = document.getElementById("device-label");

// Dynamic device detection and versions label ...
function detectDevice() 
{
    const width = window.innerWidth;
    if (width < 768) { currentDevice = "Mobile"; }
    else if (width >= 768 && width <= 1024) { currentDevice = "Tablet"; }
    else { currentDevice = "Desktop"; }
    deviceLabel.textContent = `[ ${currentDevice} Version ]`;
}
detectDevice();
window.addEventListener("resize", detectDevice);

// New website title on focus change ...
let originalTitle = document.title;
window.addEventListener("blur", () => { if (currentDevice === "Desktop") { document.title = "Please come back ?"; } });
window.addEventListener("focus", () => { document.title = originalTitle; });

// Random color generator for text hover effect ...
const handleText = document.querySelector('.handle');
let colorInterval;
function setRandomColor() 
{
    const r = Math.floor(Math.random() * 256); const g = Math.floor(Math.random() * 256); const b = Math.floor(Math.random() * 256);
    document.documentElement.style.setProperty('--random-color', `rgb(${r}, ${g}, ${b})`);
}
handleText.addEventListener('mouseenter', () => 
{ if (currentDevice === "Desktop") { setRandomColor(); colorInterval = setInterval(setRandomColor, 500); } });
handleText.addEventListener('mouseleave', () => 
{ clearInterval(colorInterval);  document.documentElement.style.setProperty('--random-color', '#ffffff'); });
