package com.benhamadi.fiduciaire_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendNewAppointmentEmailToMehdi(Appointment appointment) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("mehdi123bts@gmail.com");
            helper.setTo("mehdi123bts@gmail.com");
            helper.setReplyTo(appointment.getClientEmail());
            helper.setSubject("📅 Nouvelle demande d'Agenda : " + appointment.getClientName());
            
            String htmlMsg = "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto;'>" +
                             "<h2 style='color: #0f172a; border-bottom: 2px solid #d97706; padding-bottom: 10px;'>Nouvelle demande de Rendez-vous</h2>" +
                             "<p>Bonjour Mehdi,</p>" +
                             "<p>Une nouvelle demande de consultation a été soumise sur votre site web.</p>" +
                             "<table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>" +
                             "<tr><td style='padding: 10px; border: 1px solid #eee;'><strong>👤 Client</strong></td><td style='padding: 10px; border: 1px solid #eee;'>" + appointment.getClientName() + "</td></tr>" +
                             "<tr><td style='padding: 10px; border: 1px solid #eee;'><strong>✉️ Email</strong></td><td style='padding: 10px; border: 1px solid #eee;'><a href='mailto:" + appointment.getClientEmail() + "'>" + appointment.getClientEmail() + "</a></td></tr>" +
                             "<tr><td style='padding: 10px; border: 1px solid #eee;'><strong>📞 Téléphone</strong></td><td style='padding: 10px; border: 1px solid #eee;'>" + appointment.getClientPhone() + "</td></tr>" +
                             "<tr><td style='padding: 10px; border: 1px solid #eee;'><strong>📅 Date souhaitée</strong></td><td style='padding: 10px; border: 1px solid #eee; color: #d97706; font-weight: bold;'>" + appointment.getAppointmentDate() + " à " + appointment.getAppointmentTime() + "</td></tr>" +
                             "</table>" +
                             "<div style='margin-top: 30px; text-align: center;'>" +
                             "<a href='mailto:" + appointment.getClientEmail() + "?subject=Confirmation de votre rendez-vous - Fiduciaire BENHAMADI&body=Bonjour " + appointment.getClientName() + ", je vous confirme notre rendez-vous le " + appointment.getAppointmentDate() + " à " + appointment.getAppointmentTime() + ".' style='background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>✅ Confirmer le rendez-vous au client</a>" +
                             "</div>" +
                             "</div>";
            
            helper.setText(htmlMsg, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void sendAcknowledgementEmailToClient(Appointment appointment) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("mehdi123bts@gmail.com");
            helper.setTo(appointment.getClientEmail());
            helper.setSubject("Accusé de réception - Demande de rendez-vous Fiduciaire BENHAMADI");
            
            String htmlMsg = "<div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>" +
                             "<h3>Bonjour " + appointment.getClientName() + ",</h3>" +
                             "<p>Nous vous confirmons la bonne réception de votre demande de rendez-vous pour le <strong>" + appointment.getAppointmentDate() + " à " + appointment.getAppointmentTime() + "</strong>.</p>" +
                             "<p>Monsieur Mehdi étudiera votre demande et vous contactera très prochainement pour <strong>confirmer définitivement cet horaire</strong>.</p>" +
                             "<p>Nous vous remercions de votre confiance.</p>" +
                             "<br><p>Cordialement,</p><p><strong>La Direction - Fiduciaire BENHAMADI</strong></p></div>";
                             
            helper.setText(htmlMsg, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
