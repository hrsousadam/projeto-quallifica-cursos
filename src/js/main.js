import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;
    if (user && (currentPath.endsWith('login.html') || currentPath.endsWith('index.html') || currentPath === '/')) {
        window.location.href = "student.html";
    } else if (!user && currentPath.endsWith('student.html')) {
        window.location.href = "login.html";
    }
});
export { };
