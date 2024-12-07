package com.example.annotation_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnnotationResponse {
    private String title;
    private List<AnnotationDetails> annotations;
}
