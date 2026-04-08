document.addEventListener('DOMContentLoaded', () => {

    console.log("JS carregado 🚀");

    // 🔍 Verifica EmailJS
    if (typeof emailjs === "undefined") {
        console.error("❌ EmailJS NÃO carregou");
        alert("Erro: EmailJS não carregou!");
        return;
    }

    console.log("✅ EmailJS carregado");

    // 🔑 CONFIGURE AQUI
    const PUBLIC_KEY = "3eeA93KVPjbDiy0cR";
    const SERVICE_ID = "service_5fg7mer";
    const TEMPLATE_ID = "template_411y4x5";

    emailjs.init(PUBLIC_KEY);

    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("❌ Formulário não encontrado");
        return;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log("📨 Tentando enviar...");

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !mensagem) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        const params = {
            nome: nome,
            email: email,
            telefone: telefone,
            mensagem: mensagem
        };

        console.log("📦 PARAMS:", params);

        emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
        .then((res) => {
            console.log("✅ SUCESSO:", res);
            alert("Mensagem enviada com sucesso!");
            form.reset();
        })
        .catch((err) => {
            console.error("❌ ERRO COMPLETO:", err);
            alert("Erro ao enviar. Veja o console (F12).");
        });

    }); // ✅ FECHADO CORRETAMENTE

    // 🎯 Animações on scroll
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

}); // ✅ FECHAMENTO FINAL