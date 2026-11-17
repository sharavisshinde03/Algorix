
package sentinel_backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RiskAnalysisService {

    private static final int KNOWN_THREAT_SCORE = 100;
    private static final int SUSPICIOUS_DOMAIN_SCORE = 40;
    private static final int POINTS_PER_PATTERN = 10;
    private static final int MAX_PATTERN_SCORE = 30;

    public RiskAnalysisResult analyze(
            boolean exactDatabaseMatch,
            String matchedDomain,
            List<String> matchedPatterns) {

        if (matchedPatterns == null) {
            throw new IllegalArgumentException(
                    "Matched patterns cannot be null"
            );
        }

        List<String> reasons = new ArrayList<>();

        // An exact known-threat match takes priority.
        if (exactDatabaseMatch) {

            reasons.add(
                    "Exact match found in the known-threat database"
            );

            return new RiskAnalysisResult(
                    100,
                    "CONFIRMED_KNOWN_THREAT",
                    List.copyOf(reasons)
            );
        }

        int score = 0;

        // Trie evidence
        if (matchedDomain != null && !matchedDomain.isBlank()) {

            score += SUSPICIOUS_DOMAIN_SCORE;

            reasons.add(
                    "Hostname matches configured suspicious domain: "
                            + matchedDomain
            );
        }

        // KMP evidence
        int patternScore = Math.min(
                matchedPatterns.size() * POINTS_PER_PATTERN,
                MAX_PATTERN_SCORE
        );

        score += patternScore;

        if (!matchedPatterns.isEmpty()) {

            reasons.add(
                    "Suspicious URL patterns detected: "
                            + String.join(", ", matchedPatterns)
            );
        }

        if (score == 0) {
            reasons.add(
                    "No configured suspicious indicators were detected"
            );
        }

        String riskLevel;

        if (score >= 40) {
            riskLevel = "HIGH";
        } else if (score >= 20) {
            riskLevel = "MODERATE";
        } else if (score > 0) {
            riskLevel = "LOW";
        } else {
            riskLevel = "MINIMAL";
        }

        return new RiskAnalysisResult(
                score,
                riskLevel,
                List.copyOf(reasons)
        );
    }

    public record RiskAnalysisResult(
            int riskScore,
            String riskLevel,
            List<String> reasons
    ) {}
}
