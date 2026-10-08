package com.benhamadi.fiduciaire_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment saved = appointmentRepository.save(appointment);
        try {
            // 1. Envoi de l'email de notification à Mehdi (avec le "Reply-To" configuré)
            emailService.sendNewAppointmentEmailToMehdi(saved);
            
            // 2. Envoi d'un accusé de réception automatique très professionnel au client
            emailService.sendAcknowledgementEmailToClient(saved);
        } catch(Exception e) {
            System.out.println("Erreur d'envoi d'emails: " + e.getMessage());
        }
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }
}
