package com.example.annotation_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "annotations")
public class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Text is required")
    public String text;
    @NotBlank(message = "Title is required")
    public String title;
    @NotNull(message = "Player time is required")
    public Double playerTime;
    @NotBlank(message = "Video type is required")
    public String videoType;
    public String episodeInfo;
    @NotBlank(message = "URL is required")
    public String url;
    public LocalDateTime timestamp;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
