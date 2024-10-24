// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwUJhOYnrgFGs6ntt2Sx-NTYpnlggHdaU",
    authDomain: "quallifica-cursos.firebaseapp.com",
    projectId: "quallifica-cursos",
    storageBucket: "quallifica-cursos.appspot.com",
    messagingSenderId: "396883518272",
    appId: "1:396883518272:web:262778ed81c86f299d10a5",
    measurementId: "G-CME8M1WWL9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Botão de login com Google
document.getElementById('google-signin-btn').addEventListener('click', async () => {
    const message = document.getElementById('message');

    try {
        // Autenticação com Google
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Gera um código único de aluno e salva o email no Firestore
        const studentCode = generateStudentCode();
        await setDoc(doc(db, "students", user.uid), {
            email: user.email,
            studentCode
        });

        // Mensagem de sucesso e redirecionamento para a página de login
        message.textContent = "Login realizado com sucesso!";
        message.style.color = "green";
        setTimeout(() => {
            window.location.href = "student.html"; // Redireciona para o dashboard
        }, 2000);
    } catch (error) {
        console.error("Erro ao fazer login com Google: ", error);
        message.textContent = "Erro ao fazer login: " + error.message;
        message.style.color = "red";
    }
});

function generateStudentCode() {
    return 'ALU' + Math.floor(1000 + Math.random() * 9000); // Gera um código de aluno simples
}
