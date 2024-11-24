package com.example.annotation_backend.service;

import com.example.annotation_backend.entity.Annotation;
import com.example.annotation_backend.entity.User;
import com.example.annotation_backend.repository.AnnotationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AnnotationService {
    @Autowired
    private final AnnotationRepository repository;

    public AnnotationService(AnnotationRepository repository) {
        this.repository = repository;
    }

    public Long create(Annotation annotation, User user)  {
        annotation.setUser(user);
        return repository.save(annotation).getId();
    }

    public Annotation getAnnotation(Long id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public List<Annotation> getAnnotationsFromUser(User user) {
        return repository.findByUser(user);
    }

    public List<Annotation> getAllAnnotations() {
        return repository.findAll();
    }
}
