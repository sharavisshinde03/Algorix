
package sentinel_backend;

import sentinel_backend.dto.ScanRequest;
import sentinel_backend.service.UrlProcessingService;
import sentinel_backend.service.KnownThreatStore;
import sentinel_backend.service.SuspiciousPatternService;
import sentinel_backend.service.SuspiciousDomainService;
import sentinel_backend.service.RiskAnalysisService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ScanController {

    private final UrlProcessingService urlProcessingService;
    private final KnownThreatStore knownThreatStore;
    private final SuspiciousPatternService suspiciousPatternService;
    private final SuspiciousDomainService suspiciousDomainService;
    private final RiskAnalysisService riskAnalysisService;

    public ScanController(
            UrlProcessingService urlProcessingService,
            KnownThreatStore knownThreatStore,
            SuspiciousPatternService suspiciousPatternService,
            SuspiciousDomainService suspiciousDomainService,
            RiskAnalysisService riskAnalysisService) {

        this.urlProcessingService = urlProcessingService;
        this.knownThreatStore = knownThreatStore;
        this.suspiciousPatternService = suspiciousPatternService;
        this.suspiciousDomainService = suspiciousDomainService;
        this.riskAnalysisService = riskAnalysisService;
    }

    @PostMapping("/scan")
    public Map<String, Object> scanUrl(
            @Valid @RequestBody ScanRequest request) {

        // Step 1: Validate and normalize URL
        var processedUrl =
                urlProcessingService.process(request.url());

        String normalizedUrl = processedUrl.normalizedUrl();
        String hostname = processedUrl.hostname();

        // Step 2: Bloom Filter and exact threat verification
        var threatResult =
                knownThreatStore.checkThreat(normalizedUrl);

        // Step 3: KMP pattern matching
        List<String> matchedPatterns =
                suspiciousPatternService.findSuspiciousPatterns(
                        normalizedUrl
                );

        // Step 4: Trie domain matching
        String matchedDomain =
                suspiciousDomainService.findMatchingDomain(
                        hostname
                );

        // Step 5: Determine detection status
        String finalStatus;

        if (threatResult.exactDatabaseMatch()) {
            finalStatus = "KNOWN_MALICIOUS";
        } else if (matchedDomain != null
                || !matchedPatterns.isEmpty()) {
            finalStatus = "SUSPICIOUS";
        } else {
            finalStatus = "NO_KNOWN_THREAT_FOUND";
        }

        // Step 6: Calculate explainable risk score
        var riskResult = riskAnalysisService.analyze(
                threatResult.exactDatabaseMatch(),
                matchedDomain,
                matchedPatterns
        );

        // Step 7: Construct API response
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("originalUrl", processedUrl.originalUrl());
        response.put("normalizedUrl", normalizedUrl);
        response.put("hostname", hostname);
        response.put("scheme", processedUrl.scheme());

        response.put("status", finalStatus);

        response.put(
                "bloomFilterMatch",
                threatResult.bloomFilterMatch()
        );

        response.put(
                "exactDatabaseMatch",
                threatResult.exactDatabaseMatch()
        );

        response.put("matchedPatterns", matchedPatterns);
        response.put("matchedDomain", matchedDomain);

        response.put("riskScore", riskResult.riskScore());
        response.put("riskLevel", riskResult.riskLevel());
        response.put("reasons", riskResult.reasons());

        return response;
    }
}
