package com.algorix.backend.service;

import com.algorix.backend.algorithm.Trie;
import com.algorix.backend.dto.SearchSuggestionResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final Trie trie = new Trie();

    public SearchService() {
        loadLearningContent();
    }

    private void loadLearningContent() {
        add("Introduction to Programming", "Java Foundations");
        add("Getting Started with Java", "Java Foundations");
        add("Java Fundamentals", "Java Foundations");
        add("Operators", "Java Foundations");
        add("Input and Output", "Java Foundations");
        add("Decision Making", "Java Foundations");
        add("Loops", "Java Foundations");
        add("Methods", "Java Foundations");
        add("Arrays and Strings", "Java Foundations");
        add("Object-Oriented Programming", "Java Foundations");
        add("Advanced OOP", "Java Foundations");
        add("Exception Handling", "Java Foundations");
        add("Java Collections and Generics", "Java Foundations");
        add("Recursion and File Handling", "Java Foundations");
        add("Advanced Java Concepts", "Java Foundations");

        add("Programming Foundations", "Learning Path");
        add("Core Data Structures", "Learning Path");
        add("Advanced DSA", "Learning Path");
        add("Advanced Algorithms", "Learning Path");

        add("Arrays", "Data Structures");
        add("Linked Lists", "Data Structures");
        add("Stacks", "Data Structures");
        add("Queues", "Data Structures");
        add("Trees", "Data Structures");
        add("Graphs", "Data Structures");
        add("Heaps", "Data Structures");
        add("Hashing", "Data Structures");

        add("Binary Search", "Algorithms");
        add("Sorting", "Algorithms");
        add("Recursion", "Algorithms");
        add("Backtracking", "Algorithms");
        add("Greedy Algorithms", "Algorithms");
        add("Dynamic Programming", "Algorithms");
        add("Dijkstra Algorithm", "Algorithms");
        add("Breadth First Search", "Algorithms");
        add("Depth First Search", "Algorithms");
    }

    private void add(String title, String category) {
        trie.insert(title + "|" + category);
    }

    public List<SearchSuggestionResponse> getSuggestions(String query, int limit) {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        return trie.searchPrefix(query.trim(), limit)
                .stream()
                .map(item -> {
                    int separator = item.lastIndexOf('|');

                    return new SearchSuggestionResponse(
                            item.substring(0, separator),
                            item.substring(separator + 1)
                    );
                })
                .toList();
    }
}
