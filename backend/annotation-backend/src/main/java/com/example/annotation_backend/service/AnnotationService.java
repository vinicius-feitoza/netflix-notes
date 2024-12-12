package com.example.annotation_backend.service;

import com.example.annotation_backend.dto.AnnotationDetails;
import com.example.annotation_backend.dto.AnnotationResponse;
import com.example.annotation_backend.entity.Annotation;
import com.example.annotation_backend.entity.User;
import com.example.annotation_backend.repository.AnnotationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.h2.util.StringUtils.isNullOrEmpty;

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

    public List<AnnotationResponse> getGroupedAnnotations(User user) {
        List<Annotation> annotations = repository.findByUser(user);

        Map<String, List<AnnotationDetails>> showsMap = new LinkedHashMap<>();

        for (Annotation annotation : annotations) {
            String title = annotation.getTitle();
            String formattedPlayerTime = formatPlayerTime(annotation.getPlayerTime());

            String episodeInfo = "";
            if ("TV Show".equalsIgnoreCase(annotation.getVideoType()) && !isNullOrEmpty(annotation.getEpisodeInfo())) {
                episodeInfo = annotation.getEpisodeInfo();
            }

            AnnotationDetails annotationDetails = AnnotationDetails.builder()
                    .episodeInfo(episodeInfo)
                    .playerTime(formattedPlayerTime)
                    .text(annotation.getText())
                    .url(annotation.getUrl())
                    .build();

            showsMap.computeIfAbsent(title, k -> new ArrayList<>()).add(annotationDetails);
        }

        List<AnnotationResponse> annotationList = new ArrayList<>();
        for (Map.Entry<String, List<AnnotationDetails>> entry : showsMap.entrySet()) {
            String title = entry.getKey();
            List<AnnotationDetails> detailsList = entry.getValue();

            AnnotationResponse response = AnnotationResponse.builder()
                    .title(title)
                    .annotations(detailsList)
                    .build();

            annotationList.add(response);
        }

        return annotationList;
    }

    private String formatPlayerTime(Double playerTimeInSeconds) {
        int totalSeconds = playerTimeInSeconds != null ? playerTimeInSeconds.intValue() : 0;
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;
        int seconds = totalSeconds % 60;
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }

}
