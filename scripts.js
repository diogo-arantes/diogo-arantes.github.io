document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector(".arrow");
        const isActive = button.classList.contains("active");

        // Close all open answers
        document.querySelectorAll(".faq-answer").forEach(ans => {
            ans.style.maxHeight = "0";
            ans.style.overflow = "hidden";
            ans.style.padding = "0 15px";
        });

        document.querySelectorAll(".faq-question").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".faq-question .arrow").forEach(arrow => arrow.style.transform = "rotate(0deg)");

        if (!isActive) {
            answer.style.display = "block"; // Ensure it's visible before measuring height
            const realHeight = answer.scrollHeight + 15 + "px";
            answer.style.maxHeight = realHeight;
            answer.style.padding = "15px";
            button.classList.add("active");
            icon.style.transform = "rotate(90deg)";
        } else {
            answer.style.maxHeight = "0";
            answer.style.padding = "0 15px";
            setTimeout(() => { answer.style.display = "none"; }, 400); // Hide after transition
        }
    });
});

// Function to parse the snippets from the file
function parseSnippets(data) {
    const snippets = [];

    // Normalize line endings to \n
    const normalizedData = data.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalizedData.split('\n');

    let currentSnippet = null;

    lines.forEach(line => {
        if (line.startsWith('[') && line.endsWith(']')) {
            // New snippet section
            if (currentSnippet) {
                snippets.push(currentSnippet); // Save the previous snippet
            }
            currentSnippet = {
                title: line.slice(1, -1).trim(), // Remove brackets and trim spaces
                code: ''
            };
        } else if (currentSnippet) {
            // Add code to the current snippet
            currentSnippet.code += line + '\n';
        }
    });

    // Add the last snippet
    if (currentSnippet) {
        snippets.push(currentSnippet);
    }

    console.log('All snippets:', snippets); // Debugging
    return snippets;
}


// Function to create code boxes dynamically
function createCodeBoxes(snippets) {
    const codesSection = document.querySelector('.codes .content');

    snippets.forEach(snippet => {
        // Create the code box
        const codeBox = document.createElement('div');
        codeBox.className = 'code-box';

        // Create the snippet title
        const snippetTitle = document.createElement('p');
        snippetTitle.className = 'snippet';
        snippetTitle.innerHTML = `
            <i class="fas fa-arrow-right arrow"></i>
            <span>${snippet.title}</span>
        `;

        // Create the terminal box (starts collapsed)
        const terminal = document.createElement('div');
        terminal.className = 'terminal';
        terminal.style.maxHeight = "0"; // Starts closed

        // Create the code block
        const codeBlock = document.createElement('pre');
        const codeElement = document.createElement('code');

        // Detect language (default to Python)
        let languageClass = 'language-python';
        if (snippet.title.toLowerCase().includes('javascript')) {
            languageClass = 'language-javascript';
        }

        codeElement.className = languageClass;
        codeElement.textContent = snippet.code.trim(); // Preserve line breaks
        codeBlock.appendChild(codeElement);
        terminal.appendChild(codeBlock);

        // Apply Prism.js syntax highlighting
        Prism.highlightElement(codeElement);

        // Create the copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerText = 'Copiar';
        copyButton.onclick = () => copyCode(codeElement);
        terminal.appendChild(copyButton);

        // Create the download button
        const downloadButton = document.createElement('button');
        downloadButton.className = 'download-btn';
        downloadButton.innerText = 'Baixar Código';
        downloadButton.onclick = () => downloadCode(snippet.title, codeElement);
        terminal.appendChild(downloadButton);

        // **Enable the "Run Code" button only if the file has .html extension**
        if (snippet.title.toLowerCase().startsWith('nave')) {
            const runCodeButton = document.createElement('button');
            runCodeButton.className = 'run-btn';
            runCodeButton.innerText = 'Executar Código';

            runCodeButton.onclick = () => {
                const gameUrl = 'https://hotflame.com.br/lib/maldicao-do-emoji';

                // Open the game page in a new tab
                window.open(gameUrl, '_blank');
            };

            terminal.appendChild(runCodeButton);
        }

        // Add click event to open/close snippet
        snippetTitle.addEventListener('click', () => {
            // Close any currently open terminal before opening the new one
            document.querySelectorAll('.terminal.open').forEach(openTerminal => {
                if (openTerminal !== terminal) {
                    openTerminal.classList.remove('open');
                    openTerminal.style.maxHeight = "0";
                    openTerminal.previousElementSibling.classList.remove('open'); // Remove 'open' from snippet title
                }
            });

            // Toggle the clicked snippet and arrow
            const isOpen = terminal.classList.contains('open');
            if (isOpen) {
                terminal.classList.remove('open');
                terminal.style.maxHeight = "0";
                snippetTitle.classList.remove('open'); // Remove class from snippet title
            } else {
                terminal.classList.add('open');
                terminal.style.maxHeight = terminal.scrollHeight + "px"; // Animate opening
                snippetTitle.classList.add('open'); // Add class to snippet title
            }
        });

        // Append elements to the code box
        codeBox.appendChild(snippetTitle);
        codeBox.appendChild(terminal);

        // Append the code box to the section
        codesSection.appendChild(codeBox);
    });
}

// Function to download code as a file
function downloadCode(title, codeElement) {
    const codeContent = codeElement.innerText;
    const blob = new Blob([codeContent], { type: 'text/plain' });

    // Cria um link para download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = title.replace(/\s+/g, '_'); // Nome do arquivo baseado no título
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to copy code to clipboard
function copyCode(codeElement) {
    const code = codeElement.innerText;
    navigator.clipboard.writeText(code)
        .then(() => console.log('Code copied to clipboard!'))
        .catch(() => console.log('Failed to copy code.'));
}

function runSnippetInNewTab(code) {
    // Create a new HTML document with the code
    const htmlContent = `
        <html>
        <head>
            <title>Code Execution</title>
        </head>
        <body>
            ${code}
        </body>
        </html>
    `;

    // Convert HTML content into a Blob
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Open the new tab with the generated URL
    window.open(url, '_blank');
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://hotflame.com.br/codes.txt')
        .then(response => response.text())
        .then(data => {
            const snippets = parseSnippets(data);
            createCodeBoxes(snippets);
        })
        .catch(error => console.error('Error loading codes:', error));

    let lastScrollTop = 0;

    document.querySelectorAll('.mostrar-conteudo').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const conteudoContainer = document.getElementById('conteudo-container');
            const conteudoDinamico = document.getElementById('conteudo-dinamico');
            const conteudoSelecionado = document.getElementById(targetId);

            if (conteudoSelecionado) {
                conteudoDinamico.innerHTML = conteudoSelecionado.innerHTML;
                conteudoContainer.classList.add('ativo');

                // Wait for rendering to apply the scroll effect
                setTimeout(() => {
                    conteudoContainer.scrollTop = 0;
                    conteudoDinamico.scrollTop = 0;
                }, 350);

                lastScrollTop = window.scrollY; // Save scroll position
                document.body.style.position = 'fixed';
                document.body.style.top = `-${lastScrollTop}px`;
                document.body.classList.add('modal-aberto');
            } else {
                console.error("Erro: Conteúdo não encontrado para o ID:", targetId);
            }
        });
    });

    document.querySelector('.fechar-conteudo').addEventListener('click', function () {
        document.getElementById('conteudo-container').classList.remove('ativo');
        document.body.classList.remove('modal-aberto');

        // Restore scroll position after closing modal
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, lastScrollTop);
    });
});

VANTA.DOTS({
    el: ".conteudo",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xe69d03,
    color2: 0x155fb3,
    showLines: false,
    size: 2,
    backgroundAlpha: 0.5,
    spacing: 16.00,
});

VANTA.DOTS({
    el: ".outros-conteudos",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xe69d03,
    color2: 0x155fb3,
    showLines: false,
    size: 2,
    backgroundAlpha: 0.5,
    spacing: 16.00,
});

VANTA.HALO({
    el: ".conteudo-detalhado",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    backgroundColor: 0x0,
    xOffset: 0.35,
    size: 1.80
})