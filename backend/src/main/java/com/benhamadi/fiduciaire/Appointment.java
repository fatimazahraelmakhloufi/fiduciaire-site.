package com.benhamadi.fiduciaire;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String message;
    
    private LocalDateTime appointmentDate;
    
    // Status: PENDING, CONFIRMED, REJECTED
    private String status = "PENDING"; 
}
