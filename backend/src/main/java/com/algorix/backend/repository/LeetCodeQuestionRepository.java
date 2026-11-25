package com.algorix.backend.repository;

import com.algorix.backend.entity.LeetCodeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LeetCodeQuestionRepository
        extends JpaRepository<LeetCodeQuestion, UUID> {

    List<LeetCodeQuestion>
    findByChapterIdOrderByProblemNumberAsc(String chapterId);
}
