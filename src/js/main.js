// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwUJhOYnrgFGs6ntt2Sx-NTYpnlggHdaU",
    authDomain: "quallifica-cursos.firebaseapp.com",
    projectId: "quallifica-cursos",
    storageBucket: "quallifica-cursos.appspot.com",
    messagingSenderId: "396883518272",
    appId: "1:396883518272:web:262778ed81c86f299d10a5",
    measurementId: "G-CME8M1WWL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Verificação de estado de autenticação
onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;
    if (user) {
        if (currentPath.endsWith('login.html') || currentPath.endsWith('index.html') || currentPath === '/') {
            window.location.href = "student.html"; // Redireciona usuários autenticados para a área do aluno
        }
    } else {
        if (currentPath.endsWith('student.html')) {
            window.location.href = "login.html"; // Redireciona usuários não autenticados para a página de login
        }
    }
});

// Login function
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = "student.html"; // Redirect to student area after login
            })
            .catch((error) => {
                document.getElementById('login-error').textContent = 'Login failed: ' + error.message;
            });
    });
}

// Logout function for navigation
const logoutNav = document.getElementById('logout-nav');
if (logoutNav) {
    logoutNav.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = "login.html"; // Redirect to login page after logout
        }).catch((error) => {
            alert('Erro ao fazer logout: ' + error.message);
        });
    });
}

export { }; // Para que o arquivo seja tratado como um módulo
