package com.example.annotation_backend.controller;

import com.example.annotation_backend.dto.AnnotationResponse;
import com.example.annotation_backend.entity.Annotation;
import com.example.annotation_backend.entity.User;
import com.example.annotation_backend.service.AnnotationService;
import com.example.annotation_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/annotations")
@CrossOrigin(origins = "*") // Allows all origins temporarily
public class AnnotationController {
    @Autowired
    private final AnnotationService annotationService;

    private final UserService userService;

    public AnnotationController(AnnotationService annotationService, UserService userService) {
        this.annotationService = annotationService;
        this.userService = userService;
    }


    @PostMapping("/create")
    public ResponseEntity<String> createAnnotation(@Valid @RequestBody Annotation annotation, Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);

        Long id = annotationService.create(annotation, user);

        return ResponseEntity.status(201).body(String.format("Annotation created successfully! Id: %d", id));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Annotation> getAnnotation (@PathVariable Long id){
        return ResponseEntity.status(200).body(annotationService.getAnnotation(id));
    }

    @GetMapping
    public ResponseEntity<List<Annotation>> getAllAnnotationsForUser(Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);

        return ResponseEntity.status(200).body(annotationService.getAnnotationsFromUser(user));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Annotation>> getAllAnnotations() {
        return ResponseEntity.status(200).body(annotationService.getAllAnnotations());
    }

    @GetMapping("/grouped")
    public ResponseEntity<List<AnnotationResponse>> getAnnotationsGroupedByTitle(Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);

        List<AnnotationResponse> groupedAnnotations = annotationService.getGroupedAnnotations(user);
        return ResponseEntity.ok(groupedAnnotations);
    }
}