package com.algorix.backend.algorithm;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Trie {

    private static class TrieNode {
        Map<Character, TrieNode> children = new TreeMap<>();
        List<String> suggestions = new ArrayList<>();
    }

    private final TrieNode root = new TrieNode();

    // Insert a word into the Trie.
    public void insert(String word) {
        if (word == null || word.isBlank()) {
            return;
        }

        String normalized = word.trim().toLowerCase();
        TrieNode current = root;

        for (char character : normalized.toCharArray()) {
            current = current.children.computeIfAbsent(
                    character, key -> new TrieNode()
            );
        }

        if (!current.suggestions.contains(word.trim())) {
            current.suggestions.add(word.trim());
        }
    }

    // Find all suggestions matching a prefix.
    public List<String> searchPrefix(String prefix, int limit) {
        List<String> results = new ArrayList<>();

        if (prefix == null || prefix.isBlank() || limit <= 0) {
            return results;
        }

        TrieNode current = root;

        for (char character : prefix.trim().toLowerCase().toCharArray()) {
            current = current.children.get(character);

            if (current == null) {
                return results;
            }
        }

        collectSuggestions(current, results, limit);
        return results;
    }

    // Traverse the Trie to collect matching words.
    private void collectSuggestions(
            TrieNode node,
            List<String> results,
            int limit
    ) {
        if (results.size() >= limit) {
            return;
        }

        results.addAll(node.suggestions);

        if (results.size() > limit) {
            results.subList(limit, results.size()).clear();
            return;
        }

        for (TrieNode child : node.children.values()) {
            if (results.size() >= limit) {
                break;
            }

            collectSuggestions(child, results, limit);
        }
    }
}
