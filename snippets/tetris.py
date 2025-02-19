// Load code for all snippets
document.querySelectorAll('code[data-src]').forEach(codeElement => {
    const elementId = codeElement.id;
    const filePath = codeElement.getAttribute('data-src');
    loadCode(elementId, filePath);
});

// Show/hide terminal on title click
document.querySelectorAll('.title').forEach(title => {
    title.addEventListener('click', () => {
        const terminal = title.nextElementSibling;
        terminal.style.display = terminal.style.display === 'block' ? 'none' : 'block';
    });
});