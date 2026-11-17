
package sentinel_backend.algorithm.kmp;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class KmpMatcherTest {

    private final KmpMatcher matcher = new KmpMatcher();

    @Test
    void shouldFindExistingPattern() {
        assertTrue(
                matcher.contains(
                        "https://example.com/verify-account",
                        "verify-account"
                )
        );
    }

    @Test
    void shouldRejectMissingPattern() {
        assertFalse(
                matcher.contains(
                        "https://example.com/home",
                        "verify-account"
                )
        );
    }

    @Test
    void shouldFindPatternAtBeginning() {
        assertTrue(
                matcher.contains(
                        "verify-account.example.com",
                        "verify"
                )
        );
    }

    @Test
    void shouldFindMultipleOccurrences() {

        var positions = matcher.findOccurrences(
                "abcabcabc",
                "abc"
        );

        assertEquals(
                java.util.List.of(0, 3, 6),
                positions
        );
    }

    @Test
    void shouldRejectEmptyPattern() {
        assertThrows(
                IllegalArgumentException.class,
                () -> matcher.contains("example.com", "")
        );
    }
}
