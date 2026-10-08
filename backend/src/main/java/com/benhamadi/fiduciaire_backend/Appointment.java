package com.benhamadi.fiduciaire_backend;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "appointments")
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String serviceType;
    private String appointmentDate;
    private String appointmentTime;
}
