
package sentinel_backend.service;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SuspiciousPatternServiceTest {

    private final SuspiciousPatternService service =
            new SuspiciousPatternService();

    @Test
    void shouldFindVerifyAccountPattern() {

        var result = service.findSuspiciousPatterns(
                "https://example.com/verify-account"
        );

        assertEquals(List.of("verify-account"), result);
    }

    @Test
    void shouldFindMultiplePatterns() {

        var result = service.findSuspiciousPatterns(
                "https://example.com/verify-account/login"
        );

        assertEquals(
                List.of("verify-account", "login"),
                result
        );
    }

    @Test
    void shouldMatchUppercasePatterns() {

        var result = service.findSuspiciousPatterns(
                "https://example.com/VERIFY-ACCOUNT"
        );

        assertEquals(List.of("verify-account"), result);
    }

    @Test
    void shouldReturnEmptyListWhenNoPatternMatches() {

        var result = service.findSuspiciousPatterns(
                "https://example.com/products"
        );

        assertTrue(result.isEmpty());
    }

    @Test
    void shouldRejectEmptyUrl() {

        assertThrows(
                IllegalArgumentException.class,
                () -> service.findSuspiciousPatterns("")
        );
    }
}
