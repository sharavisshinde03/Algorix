package com.algorix.backend.repository;

import com.algorix.backend.entity.LearningActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LearningActivityRepository
        extends JpaRepository<LearningActivity, UUID> {

    Optional<LearningActivity> findByUser_IdAndActivityDate(
            UUID userId,
            LocalDate activityDate
    );

    List<LearningActivity> findAllByUser_IdAndActivityDateBetweenOrderByActivityDateAsc(
            UUID userId,
            LocalDate startDate,
            LocalDate endDate
    );
}
