package com.example.annotation_backend.repository;

import com.example.annotation_backend.entity.Annotation;
import com.example.annotation_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnotationRepository extends JpaRepository<Annotation, Long> {
    List<Annotation> findByUser(User user);
}
