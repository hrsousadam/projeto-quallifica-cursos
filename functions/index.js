const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Carrega as variáveis de ambiente do arquivo .env para uso local
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // Apenas em desenvolvimento
}

// Configura o OAuth2 Client, usando variáveis de ambiente para produção ou .env para desenvolvimento
const oauth2Client = new OAuth2(
    process.env.NODE_ENV === "production"
        ? functions.config().gmail.client_id
        : process.env.CLIENT_ID,
    process.env.NODE_ENV === "production"
        ? functions.config().gmail.client_secret
        : process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

// Configura o refresh token
oauth2Client.setCredentials({
    refresh_token: process.env.NODE_ENV === "production"
        ? functions.config().gmail.refresh_token
        : process.env.REFRESH_TOKEN,
});

async function sendMail(contactData) {
    try {
        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "hrsousa.dam@gmail.com", // Seu e-mail
                clientId: process.env.NODE_ENV === "production"
                    ? functions.config().gmail.client_id
                    : process.env.CLIENT_ID,
                clientSecret: process.env.NODE_ENV === "production"
                    ? functions.config().gmail.client_secret
                    : process.env.CLIENT_SECRET,
                refreshToken: process.env.NODE_ENV === "production"
                    ? functions.config().gmail.refresh_token
                    : process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: "hrsousa.dam@gmail.com",
            to: "hrsousa.dam@gmail.com", // Substitua pelo destinatário
            subject: `Nova mensagem de contato de ${contactData.nome}`,
            text: `Nome: ${contactData.nome}\nEmail: ${contactData.email}\nTelefone: ${contactData.telefone}\nMensagem: ${contactData.mensagem}`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email enviado:", result);
        return result;
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        throw error;
    }
}

// Função Firebase para acionar o envio de e-mails ao receber novos dados
exports.sendContactEmail = functions.database.ref("/contatos/{contactId}")
    .onCreate(async (snapshot, context) => {
        const contactData = snapshot.val();
        await sendMail(contactData);
    });
