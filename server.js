const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mehdi123bts@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'gnncoobnippwwpfn'
  }
});

app.post('/api/appointments', async (req, res) => {
  const data = req.body;
  
  // Email 1 : Pour Mehdi (Agenda)
  const mailToMehdi = {
    from: 'mehdi123bts@gmail.com',
    to: 'mehdi123bts@gmail.com',
    replyTo: data.clientEmail,
    subject: `📅 Nouvelle demande d'Agenda : ${data.clientName}`,
    html: `
      <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;'>
        <h2 style='color: #0f172a; border-bottom: 2px solid #d97706; padding-bottom: 10px;'>Nouvelle demande de Rendez-vous</h2>
        <p>Bonjour Mehdi,</p>
        <p>Une nouvelle demande de consultation a été soumise sur votre site web.</p>
        <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
          <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>👤 Client</strong></td><td style='padding: 10px; border: 1px solid #eee;'>${data.clientName}</td></tr>
          <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>✉️ Email</strong></td><td style='padding: 10px; border: 1px solid #eee;'><a href='mailto:${data.clientEmail}'>${data.clientEmail}</a></td></tr>
          <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>📞 Téléphone</strong></td><td style='padding: 10px; border: 1px solid #eee;'>${data.clientPhone}</td></tr>
          <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>🛠️ Service</strong></td><td style='padding: 10px; border: 1px solid #eee;'>${data.serviceType}</td></tr>
          <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>📅 Date souhaitée</strong></td><td style='padding: 10px; border: 1px solid #eee; color: #d97706; font-weight: bold;'>${data.appointmentDate} à ${data.appointmentTime}</td></tr>
        </table>
        <div style='margin-top: 30px; text-align: center; display: flex; flex-direction: column; gap: 15px;'>
          <a href='mailto:${data.clientEmail}?subject=Confirmation de votre rendez-vous - Fiduciaire BENHAMADI&body=Bonjour ${data.clientName}, je vous confirme notre rendez-vous le ${data.appointmentDate} à ${data.appointmentTime}.' style='background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>✅ Confirmer le rendez-vous</a>
          <a href='mailto:${data.clientEmail}?subject=Modification de votre demande de rendez-vous - Fiduciaire BENHAMADI&body=Bonjour ${data.clientName}, malheureusement je ne suis pas disponible le ${data.appointmentDate} à ${data.appointmentTime}. Seriez-vous disponible plutôt le [INSERER NOUVELLE DATE/HEURE] ?' style='background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>❌ Proposer une autre date / Annuler</a>
        </div>
      </div>
    `
  };

  // Email 2 : Pour le client (Accusé de réception)
  const mailToClient = {
    from: 'mehdi123bts@gmail.com',
    to: data.clientEmail,
    subject: "Accusé de réception - Demande de rendez-vous Fiduciaire BENHAMADI",
    html: `
      <div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>
        <h3>Bonjour ${data.clientName},</h3>
        <p>Nous vous confirmons la bonne réception de votre demande de rendez-vous pour le <strong>${data.appointmentDate} à ${data.appointmentTime}</strong>.</p>
        <p>Monsieur Mehdi étudiera votre demande et vous contactera très prochainement pour <strong>confirmer définitivement cet horaire</strong>.</p>
        <p>Nous vous remercions de votre confiance.</p>
        <br><p>Cordialement,</p><p><strong>La Direction - Fiduciaire BENHAMADI</strong></p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailToMehdi);
    await transporter.sendMail(mailToClient);
    res.status(200).send({ message: "Emails envoyés avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erreur d'envoi" });
  }
});

app.listen(8080, () => {
  console.log("Serveur Node.js démarré sur le port 8080");
});
