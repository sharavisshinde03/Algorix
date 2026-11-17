
package sentinel_backend.algorithm.trie;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DomainTrieTest {

    @Test
    void shouldFindExactDomain() {

        DomainTrie trie = new DomainTrie();

        trie.insert("malicious-demo.test");

        assertTrue(
                trie.containsDomainOrSubdomain(
                        "malicious-demo.test"
                )
        );
    }

    @Test
    void shouldFindSubdomain() {

        DomainTrie trie = new DomainTrie();

        trie.insert("malicious-demo.test");

        assertTrue(
                trie.containsDomainOrSubdomain(
                        "login.malicious-demo.test"
                )
        );
    }

    @Test
    void shouldRejectUnrelatedDomain() {

        DomainTrie trie = new DomainTrie();

        trie.insert("malicious-demo.test");

        assertFalse(
                trie.containsDomainOrSubdomain(
                        "example.org"
                )
        );
    }

    @Test
    void shouldRejectSimilarButDifferentDomain() {

        DomainTrie trie = new DomainTrie();

        trie.insert("malicious-demo.test");

        assertFalse(
                trie.containsDomainOrSubdomain(
                        "notmalicious-demo.test"
                )
        );
    }

    @Test
    void shouldRejectEmptyDomain() {

        DomainTrie trie = new DomainTrie();

        assertThrows(
                IllegalArgumentException.class,
                () -> trie.insert("")
        );
    }
}
