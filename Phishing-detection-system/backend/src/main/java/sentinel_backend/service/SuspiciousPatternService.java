
package sentinel_backend.service;

import org.springframework.stereotype.Service;
import sentinel_backend.algorithm.kmp.KmpMatcher;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class SuspiciousPatternService {

    private final KmpMatcher kmpMatcher;

    private final List<String> suspiciousPatterns = List.of(
            "verify-account",
            "password-reset",
            "login",
            "update-payment",
            "secure-verify"
    );

    public SuspiciousPatternService() {
        this.kmpMatcher = new KmpMatcher();
    }

    public List<String> findSuspiciousPatterns(String url) {

        if (url == null || url.isBlank()) {
            throw new IllegalArgumentException(
                    "URL cannot be empty"
            );
        }

        String normalized = url.toLowerCase(Locale.ROOT);

        List<String> matches = new ArrayList<>();

        for (String pattern : suspiciousPatterns) {

            if (kmpMatcher.contains(normalized, pattern)) {
                matches.add(pattern);
            }
        }

        return List.copyOf(matches);
    }
}

