// New website title on focus change ...
let originalTitle = document.title;
window.addEventListener("blur", () => { document.title = "Please come back ?"; });
window.addEventListener("focus", () => { document.title = originalTitle; });

// Random color generator for text hover effect ...
const handleText = document.querySelector('.handle');
let colorInterval;
function setRandomColor() 
{
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    document.documentElement.style.setProperty('--random-color', `rgb(${r}, ${g}, ${b})`);
}
handleText.addEventListener('mouseenter', () => 
{
    setRandomColor();
    colorInterval = setInterval(setRandomColor, 500); 
});
handleText.addEventListener('mouseleave', () => 
{
    clearInterval(colorInterval);
    document.documentElement.style.setProperty('--random-color', '#ffffff');
}); 

// Dynamic device detection and versions label ...
const deviceLabel = document.getElementById("device-label");
function detectDevice() 
{
    const width = window.innerWidth;
    let deviceType = "Desktop";
    if (width < 768) { deviceType = "Mobile"; } 
    else if (width >= 768 && width <= 1024) { deviceType = "Tablet"; } 
    else { deviceType = "Desktop"; }
    deviceLabel.textContent = `[ ${deviceType} Version ]`;
}
detectDevice();
window.addEventListener("resize", detectDevice);
