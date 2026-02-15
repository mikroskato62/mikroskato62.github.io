// New website title on focus change ...
let originalTitle = document.title;
window.addEventListener("blur", () => { document.title = "Please come back ?"; });
window.addEventListener("focus", () => { document.title = originalTitle; });
