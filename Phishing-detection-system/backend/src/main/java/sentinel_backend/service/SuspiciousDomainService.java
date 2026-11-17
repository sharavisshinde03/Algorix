
package sentinel_backend.service;

import org.springframework.stereotype.Service;
import sentinel_backend.algorithm.trie.DomainTrie;

import java.util.List;

@Service
public class SuspiciousDomainService {

    private final DomainTrie domainTrie;

    // Synthetic demonstration domains, not real threat intelligence.
    private final List<String> suspiciousDomains = List.of(
            "malicious-demo.test",
            "fake-bank.test",
            "phishing-demo.test"
    );

    public SuspiciousDomainService() {

        this.domainTrie = new DomainTrie();

        for (String domain : suspiciousDomains) {
            domainTrie.insert(domain);
        }
    }

    public String findMatchingDomain(String hostname) {

        if (hostname == null || hostname.isBlank()) {
            throw new IllegalArgumentException(
                    "Hostname cannot be empty"
            );
        }

        if (!domainTrie.containsDomainOrSubdomain(hostname)) {
            return null;
        }

        // Identify which stored domain matched.
        for (String domain : suspiciousDomains) {

            if (hostname.equalsIgnoreCase(domain)
                    || hostname.toLowerCase()
                    .endsWith("." + domain)) {

                return domain;
            }
        }

        return null;
    }

    public List<String> getSuspiciousDomains() {
        return suspiciousDomains;
    }
}
