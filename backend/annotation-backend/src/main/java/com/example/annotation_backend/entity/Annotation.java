package com.example.annotation_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "annotations")
public class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String text;
    public String title;
    public Double playerTime;
    public String videoType;
    public String url;
    public LocalDateTime timestamp;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
