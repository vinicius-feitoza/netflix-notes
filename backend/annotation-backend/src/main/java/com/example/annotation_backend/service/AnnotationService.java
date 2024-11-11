package com.example.annotation_backend.service;

import com.example.annotation_backend.entity.Annotation;
import com.example.annotation_backend.repository.AnnotationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AnnotationService {
    @Autowired
    private final AnnotationRepository repository;

    public AnnotationService(AnnotationRepository repository) {
        this.repository = repository;
    }

    public Long create(Annotation annotation) {
        try {
            final Long annotationId = repository.save(annotation).getId();
            return annotationId;
        } catch (Exception e) {
            throw e;
        }
    }

    public Annotation getAnnoitation(Long id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }
}
