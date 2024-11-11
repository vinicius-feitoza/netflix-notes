package com.example.annotation_backend.repository;

import com.example.annotation_backend.entity.Annotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnotationRepository extends JpaRepository<Annotation, Long> {
    // Additional query methods can be defined here if needed
}
