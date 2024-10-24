// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { doc, getDoc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Function to check if user is logged in
onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user); // Log para depuração
    if (user) {
        const userId = user.uid;
        const userEmail = user.email;
        document.getElementById('student-name').textContent = user.displayName || 'Aluno';
        document.getElementById('profile-email').value = userEmail;
        loadProfile(userId); // Function to load profile
    } else {
        window.location.href = "../html/login.html"; // Redirect to login page if not logged in
    }
});

// Function to load profile data
async function loadProfile(userId) {
    try {
        const profileDoc = await getDoc(doc(db, 'profiles', userId));
        if (profileDoc.exists()) {
            const profileData = profileDoc.data();
            document.getElementById('profile-name').value = profileData.name || '';
        } else {
            console.log('No profile data found for user:', userId); // Log para depuração
        }
    } catch (error) {
        console.error('Error loading profile:', error); // Log para depuração
    }
}

// Function to update profile data
const profileForm = document.getElementById('profile-form');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = auth.currentUser.uid;
        const profileName = document.getElementById('profile-name').value;

        try {
            // Update Firestore profile data
            await setDoc(doc(db, 'profiles', userId), { name: profileName }, { merge: true });
            alert('Perfil atualizado com sucesso!');

            // Update the display name in Firebase Auth profile
            await updateProfile(auth.currentUser, { displayName: profileName });
            console.log('Firebase Auth profile updated.');

            // Update the display name in the header
            document.getElementById('student-name').textContent = profileName;
        } catch (error) {
            console.error('Error updating profile:', error); // Log para depuração
            alert('Erro ao atualizar perfil: ' + error.message);
        }
    });
}

// Show profile form when "Perfil do Aluno" button is clicked
document.getElementById('btn-profile').addEventListener('click', () => {
    const profileSection = document.getElementById('profile');
    profileSection.style.display = profileSection.style.display === 'none' ? 'block' : 'none';
});

// Logout function
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log('Logout successful'); // Log para depuração
            window.location.href = "../html/index.html"; // Redirect to main page after logout
        }).catch((error) => {
            console.error('Error during logout:', error); // Log para depuração
            alert('Erro ao fazer logout: ' + error.message);
        });
    });
}
