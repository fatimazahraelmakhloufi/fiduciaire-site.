package com.benhamadi.fiduciaire;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*") // Autoriser le frontend React
public class AppointmentController {

    @Autowired
    private AppointmentRepository repository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        // Le statut par défaut est PENDING (en attente)
        return repository.save(appointment);
    }

    @PutMapping("/{id}/confirm")
    public Appointment confirmAppointment(@PathVariable Long id) {
        Appointment app = repository.findById(id).orElseThrow();
        app.setStatus("CONFIRMED");
        return repository.save(app);
    }
}
