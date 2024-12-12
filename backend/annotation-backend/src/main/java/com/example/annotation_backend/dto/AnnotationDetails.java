package com.example.annotation_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnnotationDetails {
    private String episodeInfo;
    private String playerTime;
    private String text;
    private String url;
}
