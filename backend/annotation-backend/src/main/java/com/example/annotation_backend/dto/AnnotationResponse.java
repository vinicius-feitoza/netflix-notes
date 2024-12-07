package com.example.annotation_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class Media {
    private String title;
    private List<AnnotationGrouped> annotations;
}
