// [ @mikroskato62 ] //

// The global variables ...
let currentDevice = "Desktop"; 
const deviceLabel = document.getElementById("device-label");
const universe = document.getElementById('universe');

// Selecting the view screen between the 5 total and updating the URL ...
function moveCamera(direction)
{
    if (direction === 'middle')
    {
        window.history.pushState(null, null, window.location.pathname);
        handleHashChange();
    }
    else if (direction === 'top') { window.location.hash = 'about'; }
    else if (direction === 'bottom') { window.location.hash = 'contact'; }
    else if (direction === 'left') { window.location.hash = 'techstack'; }
    else if (direction === 'right') { window.location.hash = 'projects'; }
}
function handleHashChange()
{
    const hash = window.location.hash;
    if (hash === '#about') { universe.style.transform = `translate(-100vw, 0)`; }
    else if (hash === '#contact') { universe.style.transform = `translate(-100vw, -200dvh)`; }
    else if (hash === '#techstack') { universe.style.transform = `translate(0, -100dvh)`; }
    else if (hash === '#projects') { universe.style.transform = `translate(-200vw, -100dvh)`; }
    else { universe.style.transform = `translate(-100vw, -100dvh)`; } // Default to middle
}
window.addEventListener('hashchange', handleHashChange);
handleHashChange();

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
        { name: 'Java*',         fractionX: 0.762, fractionY: 0.087 },
        { name: 'HTML/CSS/JS',   fractionX: 0.163, fractionY: 0.278 },
        { name: 'Assembly',      fractionX: 0.729, fractionY: 0.269 },
        { name: 'Windows',       fractionX: 0.420, fractionY: 0.251 },
        { name: 'Git & GitHub',  fractionX: 0.195, fractionY: 0.463 },
        { name: 'LaTeX',         fractionX: 0.759, fractionY: 0.419 },
        { name: 'SQL',           fractionX: 0.519, fractionY: 0.444 },
        { name: 'Markdown',      fractionX: 0.163, fractionY: 0.591 },
        { name: 'Linux',         fractionX: 0.737, fractionY: 0.575 },
        { name: 'Android',       fractionX: 0.194, fractionY: 0.728 },
        { name: 'Bash',          fractionX: 0.760, fractionY: 0.702 },
        { name: 'JetBrains',     fractionX: 0.635, fractionY: 0.637 },
        { name: 'VS | VSCode',   fractionX: 0.575, fractionY: 0.170 },
        { name: 'Matlab',        fractionX: 0.602, fractionY: 0.349 },
        { name: 'AIs',           fractionX: 0.325, fractionY: 0.159 },
        { name: 'Chrome*',       fractionX: 0.420, fractionY: 0.525 },
        { name: 'Docker - Inno', fractionX: 0.333, fractionY: 0.381 },
        { name: '...',           fractionX: 0.678, fractionY: 0.126 },
        { name: ':)',            fractionX: 0.598, fractionY: 0.538 },
        { name: '!',             fractionX: 0.373, fractionY: 0.687 },
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

// The right screen ...
(function ()
{
    const PROJECTS =
    [
            {
                name: '♡ Portfolio Web App',
                description: 'Designed and developed a unique and responsive personal website featuring a dynamic, multi-panel camera navigation system. Engineered entirely from scratch using vanilla web technologies without external frameworks. Hosted on GitHub Pages ...',
                tools: ['HTML', 'CSS', 'JavaScript'],
                link: 'https://github.com/mikroskato62?tab=repositories'
            },
            {
                name: '♔ Rafish!',
                description: 'An educational chess assistant designed for the Chess.com platform on Google Chrome. It helps players analyze positions, understand optimal moves, and improve their overall gameplay. Visit the linked repository for more information ...',
                tools: ['Python', '+++'],
                link: 'https://github.com/mikroskato62?tab=repositories'
            },
            {
                name: '✎ Android App (CTDLW)',
                description: 'A comprehensive task management utility developed for the Android ecosystem. It facilitates efficient daily planning through dynamic to-do lists and includes a widget for enhanced user accessibility. See the linked repository for more details ...',
                tools: ['Java', 'Android SDK', 'SQL'],
                link: 'https://github.com/mikroskato62?tab=repositories'
            },
            {
                name: '« Amphipolis »',
                description: 'An academic group project that digitally recreates the Greek board game. Co-developed utilizing strict MVC architecture to ensure a clean separation of game logic and the user interface. Explore the source code through the link ...',
                tools: ['Java', '...'],
                link: 'https://github.com/mikroskato62?tab=repositories'
            },
            {
                name: '▪ Custom ReadMe.md',
                description: 'An automated, dynamic file designed for my GitHub profile page. It utilizes serverless hosting to continuously fetch, update and display portfolio highlights. Follow the link to view it yourself ...',
                tools: ['Markdown', 'HTML', 'Vercel', 'APIs'],
                link: 'https://github.com/mikroskato62?tab=repositories'
            },
            {
                name: '⍟ View all projects:',
                description: 'This webpage highlights a curated selection of my work; only the best ones. To check the open-source code, explore the rest projects, and discover my newest software developments, please visit my GitHub profile :D',
                tools: ['???', '!!!', "..."],
                link: 'https://github.com/mikroskato62?tab=repositories'
            }
    ];

    let currentProject = 0;
    let isAnimating = false;

    function renderCard()
    {
        const project = PROJECTS[currentProject];
        document.getElementById('fc-name').textContent = project.name;
        document.getElementById('fc-desc').textContent = project.description;
        document.getElementById('fc-star').href = project.link;

        const tools = document.getElementById('fc-tools');
        tools.innerHTML = '';
        project.tools.forEach(tool =>
        {
            const span = document.createElement('span');
            span.className = 'fc-tag';
            span.textContent = tool;
            tools.appendChild(span);
        });

        document.querySelectorAll('.fc-dot').forEach((dot, i) => { dot.classList.toggle('active', i === currentProject); });
    }

    window.changeCard = function(direction)
    {
        if (isAnimating) return;
        isAnimating = true;
        resetTimer();

        const card = document.getElementById('flashcard');
        const outClass   = direction > 0 ? 'anim-out-left' : 'anim-out-right';
        const inClass    = direction > 0 ? 'anim-in-right' : 'anim-in-left';

        card.classList.add(outClass);

        setTimeout(() =>
        {
            currentProject = (currentProject + direction + PROJECTS.length) % PROJECTS.length;
            renderCard();
            card.classList.remove(outClass);
            card.classList.add(inClass);

            setTimeout(() =>
            {
                card.classList.remove(inClass);
                isAnimating = false;
            }, 375);
        }, 325);
    };

    document.addEventListener('keydown', (e) =>
    {
        const transform = universe.style.transform;
        const onRightScreen = transform === 'translate(-200vw, -100dvh)';
        if (!onRightScreen) return;
        if (e.key === 'ArrowLeft') changeCard(-1);
        if (e.key === 'ArrowRight') changeCard(1);
    });

    const counter = document.getElementById('fc-counter');
    counter.innerHTML = '';
    PROJECTS.forEach((_, i) =>
    {
        const dot = document.createElement('span');
        dot.className = 'fc-dot' + (i === 0 ? ' active' : '');
        counter.appendChild(dot);
    });

    let autoTimer = setInterval(() => changeCard(1), 5000);
    function resetTimer()
    {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => changeCard(1), 5000);
    }
    document.querySelector('.fc-prev').addEventListener('click', resetTimer);
    document.querySelector('.fc-next').addEventListener('click', resetTimer);

    renderCard();

})();

// [ @mikroskato62 ] //