package com.example.annotation_backend.controller;

import com.example.annotation_backend.entity.Annotation;
import com.example.annotation_backend.service.AnnotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.lang.String.format;

@RestController
@RequestMapping("/annotations")

public class AnnotationController {
    @Autowired
    private final AnnotationService service;

    public AnnotationController(AnnotationService service) {
        this.service = service;
    }


    @PostMapping("/{create}")
    public ResponseEntity<String> saveAnnotation(@RequestBody Annotation annotation) {
        Long id = service.create(annotation);

        return ResponseEntity.status(201).body(format("Annotation created successfully! Id: %d", id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Annotation> getAnnotation (@PathVariable Long id){
        return ResponseEntity.status(200).body(service.getAnnoitation(id));
    }
}