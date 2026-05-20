document.addEventListener('DOMContentLoaded', () => {
    
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
            
            // Opcional: fechar outros ao abrir um
            /*
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if(otherItem !== item) otherItem.classList.remove('active');
            });
            */
        });
    });

    // Acessibilidade: Fonte
    let fontSize = 100;
    const body = document.body;

    document.getElementById('increase-font').addEventListener('click', () => {
        fontSize += 10;
        body.style.fontSize = `${fontSize}%`;
    });

    document.getElementById('decrease-font').addEventListener('click', () => {
        fontSize -= 10;
        body.style.fontSize = `${fontSize}%`;
    });

    // Dark Mode
    document.getElementById('toggle-dark-mode').addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Leitura por Voz (SpeechSynthesis)
    const synth = window.speechSynthesis;
    let utterance = null;

    document.getElementById('start-voice').addEventListener('click', () => {
        // Pega apenas o conteúdo principal (ignora sidebar, footer e botões)
        const contentToRead = document.querySelector('.content-section').innerText;
        
        // Cancela qualquer fala anterior
        synth.cancel();

        utterance = new SpeechSynthesisUtterance(contentToRead);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.1;
        
        synth.speak(utterance);
    });

    document.getElementById('stop-voice').addEventListener('click', () => {
        synth.cancel();
    });

    // Formulário de Inscrição
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado por se inscrever! Enviaremos os detalhes do seminário para o seu e-mail em breve.');
        signupForm.reset();
    });

    // Área de Comentários
    const btnComment = document.getElementById('send-comment');
    btnComment.addEventListener('click', () => {
        const text = document.getElementById('user-comment').value;
        if(text.trim() !== "") {
            alert('Comentário enviado com sucesso e aguardando moderação!');
            document.getElementById('user-comment').value = "";
        } else {
            alert('Por favor, digite um comentário antes de enviar.');
        }
    });

    // Animação de entrada (Fade In)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .intro-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});