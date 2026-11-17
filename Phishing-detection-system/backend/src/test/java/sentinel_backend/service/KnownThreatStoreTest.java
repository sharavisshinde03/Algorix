
package sentinel_backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class KnownThreatStoreTest {

    @Test
    void shouldIdentifyKnownMaliciousUrl() {
        KnownThreatStore store = new KnownThreatStore();

        var result = store.checkThreat(
                "https://phishing-demo.test/login"
        );

        assertEquals("KNOWN_MALICIOUS", result.status());
        assertTrue(result.bloomFilterMatch());
        assertTrue(result.exactDatabaseMatch());
    }

    @Test
    void shouldRejectUrlNotInThreatStore() {
        KnownThreatStore store = new KnownThreatStore();

        var result = store.checkThreat(
                "https://ordinary-example.org"
        );

        assertEquals("NO_KNOWN_THREAT_FOUND", result.status());
        assertFalse(result.bloomFilterMatch());
        assertFalse(result.exactDatabaseMatch());
    }

    @Test
    void shouldAddAndFindNewThreat() {
        KnownThreatStore store = new KnownThreatStore();

        String url = "https://new-phishing-demo.test/account";

        store.addThreat(url);

        var result = store.checkThreat(url);

        assertEquals("KNOWN_MALICIOUS", result.status());
        assertTrue(result.exactDatabaseMatch());
    }

    @Test
    void duplicateInsertionShouldNotBreakLookup() {
        KnownThreatStore store = new KnownThreatStore();

        String url = "https://duplicate-demo.test/login";

        store.addThreat(url);
        store.addThreat(url);

        var result = store.checkThreat(url);

        assertEquals("KNOWN_MALICIOUS", result.status());
        assertTrue(result.exactDatabaseMatch());
    }

    @Test
    void shouldRejectEmptyThreatUrl() {
        KnownThreatStore store = new KnownThreatStore();

        assertThrows(
                IllegalArgumentException.class,
                () -> store.addThreat("")
        );
    }
}
