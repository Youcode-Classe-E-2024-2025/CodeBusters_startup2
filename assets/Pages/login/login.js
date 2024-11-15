// Récupérer les éléments du formulaire
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginFormSection = document.getElementById('loginFormSection');
const resetPasswordSection = document.getElementById('resetPasswordSection');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');
const resetPasswordForm = document.getElementById('resetPasswordForm');

// Fonction pour la gestion de la connexion
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher la soumission par défaut

    const email = emailInput.value;
    const password = passwordInput.value;

    // Vérifier si les champs sont remplis
    if (email && password) {
        // Récupérer le tableau d'utilisateurs depuis localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Vérifier si l'email et le mot de passe correspondent à un utilisateur dans le tableau
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Si l'utilisateur est trouvé, connecter l'utilisateur et stocker ses informations globalement
            alert("Connexion réussie !");

            // Sauvegarder l'utilisateur connecté dans localStorage pour qu'il soit accessible partout
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Vous pouvez rediriger l'utilisateur vers une autre page après connexion
            // window.location.href = "page_accueil.html";
        } else {
            alert("Email ou mot de passe incorrect.");
        }
    } else {
        alert('Veuillez remplir tous les champs');
    }
});

// Ajouter un événement pour la réinitialisation du mot de passe
forgotPasswordLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginFormSection.classList.add('hidden');
    resetPasswordSection.classList.remove('hidden');
});

// Ajouter un événement pour revenir à la page de connexion
backToLoginLink.addEventListener('click', function(event) {
    event.preventDefault();
    resetPasswordSection.classList.add('hidden');
    loginFormSection.classList.remove('hidden');
});

// Fonction pour gérer la réinitialisation du mot de passe
resetPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher la soumission par défaut

    const resetEmail = document.getElementById('resetEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmNewPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    // Récupérer le tableau d'utilisateurs depuis localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Trouver l'utilisateur correspondant à l'email
    const userIndex = users.findIndex(user => user.email === resetEmail);

    if (userIndex === -1) {
        alert("Cet email n'est pas enregistré.");
        return;
    }

    // Mettre à jour le mot de passe de l'utilisateur
    users[userIndex].password = newPassword;
    
    // Sauvegarder les utilisateurs avec le mot de passe mis à jour dans localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Votre mot de passe a été réinitialisé avec succès.");

    // Revenir à la page de connexion
    resetPasswordSection.classList.add('hidden');
    loginFormSection.classList.remove('hidden');
});
