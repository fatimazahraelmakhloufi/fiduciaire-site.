const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mehdi123bts@gmail.com',
    pass: 'gnncoobnippwwpfn'
  }
});

const mailOptions = {
  from: 'mehdi123bts@gmail.com',
  to: 'mehdi123bts@gmail.com',
  replyTo: 'ahmed.dubois@email.com',
  subject: '📅 Nouvelle demande d\'Agenda : Ahmed Dubois',
  html: `
    <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;'>
      <h2 style='color: #0f172a; border-bottom: 2px solid #d97706; padding-bottom: 10px;'>Nouvelle demande de Rendez-vous</h2>
      <p>Bonjour Mehdi,</p>
      <p>Une nouvelle demande de consultation a été soumise sur votre site web.</p>
      <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
        <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>👤 Client</strong></td><td style='padding: 10px; border: 1px solid #eee;'>Ahmed Dubois</td></tr>
        <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>✉️ Email</strong></td><td style='padding: 10px; border: 1px solid #eee;'><a href='mailto:ahmed.dubois@email.com'>ahmed.dubois@email.com</a></td></tr>
        <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>📞 Téléphone</strong></td><td style='padding: 10px; border: 1px solid #eee;'>06 12 34 56 78</td></tr>
        <tr><td style='padding: 10px; border: 1px solid #eee;'><strong>📅 Date souhaitée</strong></td><td style='padding: 10px; border: 1px solid #eee; color: #d97706; font-weight: bold;'>2026-10-15 à 10:30</td></tr>
      </table>
      <div style='margin-top: 30px; text-align: center;'>
        <a href='mailto:ahmed.dubois@email.com?subject=Confirmation de votre rendez-vous - Fiduciaire BENHAMADI&body=Bonjour Ahmed Dubois, je vous confirme notre rendez-vous le 2026-10-15 à 10:30.' style='background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>✅ Confirmer le rendez-vous au client</a>
      </div>
    </div>
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log("ERREUR:", error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
