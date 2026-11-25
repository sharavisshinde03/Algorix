package com.algorix.backend.repository;

import com.algorix.backend.entity.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, UUID> {

    List<LessonProgress> findAllByUser_IdOrderByLastAccessedAtDesc(UUID userId);

    Optional<LessonProgress> findByUser_IdAndLessonId(UUID userId, String lessonId);
}
