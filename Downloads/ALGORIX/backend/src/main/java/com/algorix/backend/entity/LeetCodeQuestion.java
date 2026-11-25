package com.algorix.backend.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "leetcode_questions")
public class LeetCodeQuestion {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "chapter_id", nullable = false)
    private String chapterId;

    @Column(name = "problem_number", nullable = false)
    private Integer problemNumber;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "difficulty", nullable = false)
    private String difficulty;

    @Column(name = "topic", nullable = false)
    private String topic;

    @Column(name = "problem_url", nullable = false)
    private String problemUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "constraints_text")
    private String constraintsText;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "examples", columnDefinition = "jsonb")
    private JsonNode examples;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "tags", columnDefinition = "jsonb")
    private JsonNode tags;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "starter_code", columnDefinition = "jsonb")
    private JsonNode starterCode;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "solutions", columnDefinition = "jsonb")
    private JsonNode solutions;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "test_cases", columnDefinition = "jsonb")
    private JsonNode testCases;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "hints", columnDefinition = "jsonb")
    private JsonNode hints;

    @Column(name = "solution_explanation")
    private String solutionExplanation;

    @Column(name = "time_complexity")
    private String timeComplexity;

    @Column(name = "space_complexity")
    private String spaceComplexity;

    public LeetCodeQuestion() {
    }

    public UUID getId() {
        return id;
    }

    public String getChapterId() {
        return chapterId;
    }

    public Integer getProblemNumber() {
        return problemNumber;
    }

    public String getTitle() {
        return title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getTopic() {
        return topic;
    }

    public String getProblemUrl() {
        return problemUrl;
    }

    public String getDescription() {
        return description;
    }

    public String getConstraintsText() {
        return constraintsText;
    }

    public JsonNode getExamples() {
        return examples;
    }

    public JsonNode getTags() {
        return tags;
    }

    public JsonNode getStarterCode() {
        return starterCode;
    }

    public JsonNode getSolutions() {
        return solutions;
    }

    public JsonNode getTestCases() {
        return testCases;
    }

    public JsonNode getHints() {
        return hints;
    }

    public String getSolutionExplanation() {
        return solutionExplanation;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }
}
