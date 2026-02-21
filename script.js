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

// The left screen ...
(function ()
{
    const container = document.getElementById('mindContainer');
    if (!container) return;

    const SKILLS =
    [
        { name: 'Python*',       fractionX: 0.175, fractionY: 0.099 },
        { name: 'C, C++',        fractionX: 0.488, fractionY: 0.050 },
        { name: 'Java*',         fractionX: 0.777, fractionY: 0.087 },
        { name: 'HTML/CSS/JS',   fractionX: 0.158, fractionY: 0.278 },
        { name: 'Assembly',      fractionX: 0.755, fractionY: 0.269 },
        { name: 'Windows',       fractionX: 0.420, fractionY: 0.251 },
        { name: 'Git & GitHub',  fractionX: 0.195, fractionY: 0.463 },
        { name: 'LaTeX',         fractionX: 0.770, fractionY: 0.419 },
        { name: 'SQL',           fractionX: 0.519, fractionY: 0.444 },
        { name: 'Markdown',      fractionX: 0.163, fractionY: 0.591 },
        { name: 'Linux',         fractionX: 0.780, fractionY: 0.575 },
        { name: 'Android',       fractionX: 0.194, fractionY: 0.728 },
        { name: 'Bash',          fractionX: 0.760, fractionY: 0.702 },
        { name: 'JetBrains',     fractionX: 0.635, fractionY: 0.637 },
        { name: 'VS | VSCode',   fractionX: 0.575, fractionY: 0.170 },
        { name: 'Matlab',        fractionX: 0.602, fractionY: 0.349 },
        { name: 'AIs',           fractionX: 0.325, fractionY: 0.159 },
        { name: 'Chrome*',       fractionX: 0.420, fractionY: 0.525 },
        { name: 'Docker - Inno', fractionX: 0.333, fractionY: 0.381 },
        { name: '...',           fractionX: 0.685, fractionY: 0.124 },
        { name: ':)',            fractionX: 0.602, fractionY: 0.538 },
        { name: '!',             fractionX: 0.374, fractionY: 0.687 },
        { name: '?',             fractionX: 0.542, fractionY: 0.755 },
    ];

    const svgNamespace = 'http://www.w3.org/2000/svg';
    const createSvgElement = (elementTag, attributes = {}) =>
    {
        const element = document.createElementNS(svgNamespace, elementTag);
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    };

    function buildMindMap()
    {
        container.innerHTML = '';

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const headCenterX = containerWidth * 0.5;
        const headCenterY = containerHeight * 0.888;
        const headRadius = containerHeight * 0.057;

        const bodyCenterY = containerHeight * 1.138;
        const bodyRadius = containerHeight * 0.175;

        const fontSize = Math.max(7, containerHeight * 0.013);
        const ellipseRadiusY = fontSize * 1.15;

        const svgCanvas = createSvgElement('svg', { class: 'mind-svg', viewBox: `0 0 ${containerWidth} ${containerHeight}` });
        const svgDefinitions = createSvgElement('defs');

        const backgroundClipPath = createSvgElement('clipPath', { id: 'bclip' });
        const backgroundGroup = createSvgElement('g', { 'clip-path': 'url(#bclip)' });

        backgroundClipPath.appendChild(createSvgElement('rect', { x: 0, y: 0, width: containerWidth, height: containerHeight }));
        svgDefinitions.appendChild(backgroundClipPath);
        svgCanvas.appendChild(svgDefinitions);

        backgroundGroup.appendChild(createSvgElement('circle', { class: 'mind-person person-body', cx: headCenterX, cy: bodyCenterY, r: bodyRadius }));
        svgCanvas.appendChild(backgroundGroup);
        svgCanvas.appendChild(createSvgElement('circle', { class: 'mind-person person-head', cx: headCenterX, cy: headCenterY, r: headRadius }));

        SKILLS.forEach(skill =>
        {
            const padding = 75;
            const skillX = Math.min(containerWidth * skill.fractionX, containerWidth - padding);
            const skillY = Math.min(Math.max(containerHeight * skill.fractionY, padding * 0.5), containerHeight - padding);

            const deltaX = skillX - headCenterX;
            const deltaY = skillY - headCenterY;
            const distance = Math.hypot(deltaX, deltaY);

            const directionX = deltaX / distance;
            const directionY = deltaY / distance;

            const headPerimeterX = headCenterX + directionX * headRadius;
            const headPerimeterY = headCenterY + directionY * headRadius;

            const arrowEndX = skillX - directionX * ellipseRadiusY * 1.1;
            const arrowEndY = skillY - directionY * ellipseRadiusY * 1.1;

            const ellipseRadiusX = Math.max(ellipseRadiusY * 1.5, skill.name.length * fontSize * 0.58);

            const skillGroup = createSvgElement('g', { class: 'thought' });
            const textElement = createSvgElement('text', { class: 'mind-text', x: skillX, y: skillY, 'font-size': fontSize });

            textElement.textContent = skill.name;
            skillGroup.appendChild(createSvgElement('line', { class: 'mind-arr',  x1: headPerimeterX, y1: headPerimeterY, x2: arrowEndX, y2: arrowEndY, 'marker-end': 'url(#marr)' }));
            skillGroup.appendChild(createSvgElement('ellipse', { class: 'mind-fill', cx: skillX,  cy: skillY - 0.1,  rx: ellipseRadiusX + 3.0, ry: ellipseRadiusY + 3.0 }));
            skillGroup.appendChild(textElement);
            svgCanvas.appendChild(skillGroup);
        });

        container.appendChild(svgCanvas);
    }

    buildMindMap();
    let resizeTimer;
    window.addEventListener('resize', () =>
    {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildMindMap, 150);
    });

})();