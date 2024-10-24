// Substitua esta configuração pela sua configuração real do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAwUJhOYnrqFG56ntt2Sx-NTYpnIggHdAU",
    authDomain: "quallifica-cursos.firebaseapp.com",
    projectId: "quallifica-cursos",
    storageBucket: "quallifica-cursos.appspot.com",
    messagingSenderId: "396883518272",
    appId: "1:396883518272:web:262778ed81c86f299d10a5",
    measurementId: "G-CME8M1WLW9"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

// Obtenha referências para os elementos DOM
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const fileList = document.getElementById('fileList');
const logoutButton = document.getElementById('logoutButton');

// Função para listar arquivos
const listFiles = () => {
    const storageRef = firebase.storage().ref('uploads/');
    storageRef.listAll().then((result) => {
        fileList.innerHTML = ''; // Limpe a lista primeiro
        result.items.forEach((fileRef) => {
            fileRef.getDownloadURL().then((url) => {
                const li = document.createElement('li');
                li.textContent = fileRef.name;

                const link = document.createElement('a');
                link.href = url;
                link.textContent = 'Download';
                li.appendChild(link);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteFile(fileRef));
                li.appendChild(deleteButton);

                fileList.appendChild(li);
            });
        });
    }).catch((error) => {
        console.error('Error listing files:', error);
    });
};

// Função para deletar arquivos
function deleteFile(fileRef) {
    fileRef.delete().then(() => {
        alert('Arquivo deletado com sucesso');
        listFiles(); // Atualiza a lista após a exclusão
    }).catch((error) => {
        console.error('Erro ao deletar arquivo:', error);
    });
}

// Adicione um listener para o botão de upload
uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const allowedTypes = ['application/pdf', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
        alert('Apenas arquivos PDF e vídeos MP4 são permitidos.');
        return;
    }

    const storageRef = firebase.storage().ref('uploads/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.error('Error uploading file:', error);
        },
        () => {
            console.log('Upload successful!');
            listFiles(); // Atualize a lista de arquivos após o upload
        }
    );
});

// Adicione um listener para o botão de logout
logoutButton.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        window.location.href = 'admin-login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});

// Liste os arquivos ao carregar a página
listFiles();
