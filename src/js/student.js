import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwUJhOYnrgFGs6ntt2Sx-NTYpnlggHdaU",
    authDomain: "quallifica-cursos.firebaseapp.com",
    databaseURL: "https://quallifica-cursos-default-rtdb.firebaseio.com",
    projectId: "quallifica-cursos",
    storageBucket: "quallifica-cursos.appspot.com",
    messagingSenderId: "396883518272",
    appId: "1:396883518272:web:262778ed81c86f299d10a5",
    measurementId: "G-CME8M1WWL9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementos de foto e nome do usuário
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");

// Verificar autenticação e carregar informações do usuário
onAuthStateChanged(auth, user => {
    if (user) {
        userPhoto.src = user.photoURL || "default-avatar.png";
        userName.textContent = user.displayName || "Aluno(a)";
    } else {
        window.location.href = "login.html";
    }
});

// Configurar botão de logout
document.getElementById("logout-button").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch(error => {
        console.error("Erro ao desconectar:", error);
    });
});

// Alternar menu lateral
document.getElementById("toggle-menu").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("collapsed");
});
