
package sentinel_backend.service;

import org.springframework.stereotype.Service;
import sentinel_backend.algorithm.bloom.BloomFilter;

import java.util.HashSet;
import java.util.Set;

@Service
public class KnownThreatStore {

    private final BloomFilter bloomFilter;
    private final Set<String> exactThreats;

    public KnownThreatStore() {

        this.bloomFilter = new BloomFilter(1000, 0.01);
        this.exactThreats = new HashSet<>();

        // Synthetic demonstration threat.
        // These are NOT real threat-intelligence records.
        addThreat("https://phishing-demo.test/login");
    }

    public synchronized void addThreat(String normalizedUrl) {

        if (normalizedUrl == null || normalizedUrl.isBlank()) {
            throw new IllegalArgumentException(
                    "Threat URL cannot be empty"
            );
        }

        exactThreats.add(normalizedUrl);
        bloomFilter.add(normalizedUrl);
    }

    public synchronized ThreatCheckResult checkThreat(
            String normalizedUrl) {

        if (normalizedUrl == null || normalizedUrl.isBlank()) {
            throw new IllegalArgumentException(
                    "URL cannot be empty"
            );
        }

        // Stage 1: Probabilistic screening
        if (!bloomFilter.mightContain(normalizedUrl)) {
            return new ThreatCheckResult(
                    "NO_KNOWN_THREAT_FOUND",
                    false,
                    false
            );
        }

        // Stage 2: Exact verification
        if (exactThreats.contains(normalizedUrl)) {
            return new ThreatCheckResult(
                    "KNOWN_MALICIOUS",
                    true,
                    true
            );
        }

        // Bloom Filter false positive
        return new ThreatCheckResult(
                "NO_KNOWN_THREAT_FOUND",
                true,
                false
        );
    }

    public record ThreatCheckResult(
            String status,
            boolean bloomFilterMatch,
            boolean exactDatabaseMatch
    ) {}
}
