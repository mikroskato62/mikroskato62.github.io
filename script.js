// The global variables ...
let currentDevice = "Desktop"; 
const deviceLabel = document.getElementById("device-label");
const universe = document.getElementById('universe');

// Selecting the view screen between the 5 total ...
function moveCamera(direction) 
{
    if (direction === 'middle') { universe.style.transform = `translate(-100vw, -100dvh)`; } 
    else if (direction === 'top') { universe.style.transform = `translate(-100vw, 0)`; } 
    else if (direction === 'bottom') { universe.style.transform = `translate(-100vw, -200dvh)`; } 
    else if (direction === 'left') { universe.style.transform = `translate(0, -100dvh)`; } 
    else if (direction === 'right') { universe.style.transform = `translate(-200vw, -100dvh)`; }
}

// Dynamic device detection and versions label ...
function detectDevice() 
{
    const width = window.innerWidth;
    if (width < 768) { currentDevice = "Mobile"; }
    else if (width >= 768 && width <= 1024) { currentDevice = "Tablet"; }
    else { currentDevice = "Desktop"; }
    deviceLabel.textContent = `[ ${currentDevice} Version ]`;
    document.body.setAttribute('data-device', currentDevice);
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
