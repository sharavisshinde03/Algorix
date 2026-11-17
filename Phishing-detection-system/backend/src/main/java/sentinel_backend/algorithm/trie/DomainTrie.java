
package sentinel_backend.algorithm.trie;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class DomainTrie {

    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEndOfDomain;
    }

    private final TrieNode root = new TrieNode();

    // Insert a domain into the Trie.
    public void insert(String domain) {

        String normalized = normalizeDomain(domain);

        String reversed = new StringBuilder(normalized)
                .reverse()
                .toString();

        TrieNode current = root;

        for (char character : reversed.toCharArray()) {

            current.children.putIfAbsent(
                    character,
                    new TrieNode()
            );

            current = current.children.get(character);
        }

        current.isEndOfDomain = true;
    }

    // Check whether the hostname matches a stored domain
    // or is a subdomain of a stored domain.
    public boolean containsDomainOrSubdomain(String hostname) {

        String normalized = normalizeDomain(hostname);

        String reversed = new StringBuilder(normalized)
                .reverse()
                .toString();

        TrieNode current = root;

        for (int i = 0; i < reversed.length(); i++) {

            char character = reversed.charAt(i);

            current = current.children.get(character);

            if (current == null) {
                return false;
            }

            if (current.isEndOfDomain) {

                // Exact domain match
                if (i == reversed.length() - 1) {
                    return true;
                }

                // Match only at a domain-label boundary.
                if (reversed.charAt(i + 1) == '.') {
                    return true;
                }
            }
        }

        return false;
    }

    private String normalizeDomain(String domain) {

        if (domain == null || domain.isBlank()) {
            throw new IllegalArgumentException(
                    "Domain cannot be empty"
            );
        }

        String normalized = domain.trim()
                .toLowerCase(Locale.ROOT);

        // Remove a trailing DNS root dot.
        if (normalized.endsWith(".")) {
            normalized = normalized.substring(
                    0, normalized.length() - 1
            );
        }

        if (normalized.isBlank()
                || normalized.startsWith(".")
                || normalized.contains("..")
                || normalized.contains("/")
                || normalized.contains(":")
                || normalized.contains("@")
                || normalized.contains(" ")) {
            throw new IllegalArgumentException(
                    "Invalid domain format"
            );
        }

        return normalized;
    }
}
