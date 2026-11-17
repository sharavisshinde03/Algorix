
package sentinel_backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Locale;

@Service
public class UrlProcessingService {

    public ProcessedUrl process(String input) {

        if (input == null || input.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "URL cannot be empty"
            );
        }

        String trimmed = input.trim();

        // Reject whitespace inside the URL
        if (trimmed.chars().anyMatch(Character::isWhitespace)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "URL cannot contain spaces"
            );
        }

        try {
            URI uri = new URI(trimmed);

            String scheme = uri.getScheme();

            // Only allow HTTP and HTTPS URLs
            if (scheme == null ||
                    !(scheme.equalsIgnoreCase("http")
                    || scheme.equalsIgnoreCase("https"))) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Only HTTP and HTTPS URLs are supported"
                );
            }

            String host = uri.getHost();

            if (host == null || host.isBlank()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Invalid URL hostname"
                );
            }

            // Reject deceptive URLs containing user information
            if (uri.getRawUserInfo() != null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "URLs containing embedded credentials are not supported"
                );
            }

            scheme = scheme.toLowerCase(Locale.ROOT);
            host = host.toLowerCase(Locale.ROOT);

            int port = uri.getPort();

            // Remove default ports
            if ((scheme.equals("http") && port == 80)
                    || (scheme.equals("https") && port == 443)) {
                port = -1;
            }

            // Preserve the original path, query and fragment
            StringBuilder normalized = new StringBuilder();
            normalized.append(scheme).append("://");

            if (host.contains(":") && !host.startsWith("[")) {
                normalized.append("[").append(host).append("]");
            } else {
                normalized.append(host);
            }

            if (port != -1) {
                normalized.append(":").append(port);
            }

            if (uri.getRawPath() != null) {
                normalized.append(uri.getRawPath());
            }

            if (uri.getRawQuery() != null) {
                normalized.append("?").append(uri.getRawQuery());
            }

            if (uri.getRawFragment() != null) {
                normalized.append("#").append(uri.getRawFragment());
            }

            return new ProcessedUrl(
                    trimmed,
                    normalized.toString(),
                    scheme,
                    host
            );

        } catch (URISyntaxException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid URL format"
            );
        }
    }

    public record ProcessedUrl(
            String originalUrl,
            String normalizedUrl,
            String scheme,
            String hostname
    ) {}
}
