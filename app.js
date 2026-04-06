document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('header nav a');
    const contactForm = document.querySelector('.contact-form');
    const emailInput = document.getElementById("email");
    const telefoneInput = document.getElementById("telefone");

    // 🔽 SCROLL SUAVE
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 📧 CORREÇÃO DE EMAIL
    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            let email = emailInput.value.toLowerCase();

            const correcoes = {
                "gmai.com": "gmail.com",
                "gmil.com": "gmail.com",
                "gmail.con": "gmail.com",
                "yaho.com": "yahoo.com",
                "yahho.com": "yahoo.com"
            };

            const partes = email.split("@");

            if (partes.length === 2) {
                let dominio = partes[1];

                if (correcoes[dominio]) {
                    const novoEmail = `${partes[0]}@${correcoes[dominio]}`;

                    if (confirm(`Você quis dizer ${novoEmail}?`)) {
                        emailInput.value = novoEmail;
                    }
                }
            }
        });
    }

    // 📱 FORMATA TELEFONE
    if (telefoneInput) {
        telefoneInput.addEventListener("input", () => {
            let valor = telefoneInput.value.replace(/\D/g, "");

            if (!valor.startsWith("55")) {
                valor = "55" + valor;
            }

            valor = valor.substring(0, 13);

            let formatado = "";

            if (valor.length > 2) {
                formatado = "+" + valor.substring(0, 2);
            }

            if (valor.length > 4) {
                formatado += " (" + valor.substring(2, 4) + ")";
            }

            if (valor.length > 9) {
                formatado += " " + valor.substring(4, 9) + "-" + valor.substring(9);
            } else if (valor.length > 4) {
                formatado += " " + valor.substring(4);
            }

            telefoneInput.value = formatado;
        });
    }

    // 🚀 ENVIO DO FORMULÁRIO
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = emailInput.value.trim();
            const telefone = telefoneInput.value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !mensagem) {
                alert("Preencha nome, email e mensagem!");
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert("Email inválido!");
                return;
            }

            const texto = `Olá, me chamo ${nome}%0AEmail: ${email}%0ATelefone: ${telefone}%0AMensagem: ${mensagem}`;

            const numero = "5512991481679";
            const whatsappURL = `https://wa.me/${numero}?text=${texto}`;

            const emailURL = `mailto:kiki24012008@gmail.com?subject=Interesse no Isabel Residencial&body=${texto}`;

            if (/Android|iPhone/i.test(navigator.userAgent)) {
                window.open(whatsappURL, "_blank");
            } else {
                window.location.href = emailURL;
            }
        });
    }

});