
package sentinel_backend.service;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RiskAnalysisServiceTest {

    private final RiskAnalysisService service =
            new RiskAnalysisService();

    @Test
    void shouldReturnConfirmedKnownThreat() {

        var result = service.analyze(
                true,
                null,
                List.of()
        );

        assertEquals(100, result.riskScore());
        assertEquals(
                "CONFIRMED_KNOWN_THREAT",
                result.riskLevel()
        );
    }

    @Test
    void shouldReturnHighRiskForSuspiciousDomain() {

        var result = service.analyze(
                false,
                "fake-bank.test",
                List.of()
        );

        assertEquals(40, result.riskScore());
        assertEquals("HIGH", result.riskLevel());
    }

    @Test
    void shouldReturnLowRiskForOnePattern() {

        var result = service.analyze(
                false,
                null,
                List.of("login")
        );

        assertEquals(10, result.riskScore());
        assertEquals("LOW", result.riskLevel());
    }

    @Test
    void shouldCapPatternContributionAtThirty() {

        var result = service.analyze(
                false,
                null,
                List.of(
                        "login",
                        "verify-account",
                        "password-reset",
                        "secure-verify"
                )
        );

        assertEquals(30, result.riskScore());
        assertEquals("MODERATE", result.riskLevel());
    }

    @Test
    void shouldReturnMinimalRiskWithoutIndicators() {

        var result = service.analyze(
                false,
                null,
                List.of()
        );

        assertEquals(0, result.riskScore());
        assertEquals("MINIMAL", result.riskLevel());
        assertFalse(result.reasons().isEmpty());
    }

    @Test
    void shouldRejectNullPatternList() {

        assertThrows(
                IllegalArgumentException.class,
                () -> service.analyze(false, null, null)
        );
    }
}
