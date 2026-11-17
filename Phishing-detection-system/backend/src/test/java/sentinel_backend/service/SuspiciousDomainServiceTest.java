
package sentinel_backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SuspiciousDomainServiceTest {

    private final SuspiciousDomainService service =
            new SuspiciousDomainService();

    @Test
    void shouldFindExactSuspiciousDomain() {

        assertEquals(
                "malicious-demo.test",
                service.findMatchingDomain("malicious-demo.test")
        );
    }

    @Test
    void shouldFindSuspiciousSubdomain() {

        assertEquals(
                "malicious-demo.test",
                service.findMatchingDomain(
                        "login.malicious-demo.test"
                )
        );
    }

    @Test
    void shouldRejectUnrelatedDomain() {

        assertNull(
                service.findMatchingDomain("example.org")
        );
    }

    @Test
    void shouldRejectSimilarButDifferentDomain() {

        assertNull(
                service.findMatchingDomain(
                        "notmalicious-demo.test"
                )
        );
    }

    @Test
    void shouldRejectEmptyHostname() {

        assertThrows(
                IllegalArgumentException.class,
                () -> service.findMatchingDomain("")
        );
    }
}
