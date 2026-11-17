
package sentinel_backend.algorithm.bloom;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BloomFilterTest {

    @Test
    void shouldFindInsertedUrl() {
        BloomFilter filter = new BloomFilter(100, 0.001);

        String url = "https://malicious-example.com/login";

        filter.add(url);

        assertTrue(filter.mightContain(url));
    }

    @Test
    void shouldUsuallyRejectUrlNeverInserted() {
        BloomFilter filter = new BloomFilter(100, 0.001);

        filter.add("https://known-threat.com");

        String unknownUrl = "https://completely-different-example.org";

        assertFalse(filter.mightContain(unknownUrl));
    }

    @Test
    void duplicateInsertionShouldNotBreakFilter() {
        BloomFilter filter = new BloomFilter(100, 0.001);

        String url = "https://malicious-example.com";

        filter.add(url);
        filter.add(url);

        assertTrue(filter.mightContain(url));
    }

    @Test
    void shouldRejectEmptyString() {
        BloomFilter filter = new BloomFilter(100, 0.001);

        assertThrows(
                IllegalArgumentException.class,
                () -> filter.add("")
        );
    }

    @Test
    void shouldRejectNullValue() {
        BloomFilter filter = new BloomFilter(100, 0.001);

        assertThrows(
                IllegalArgumentException.class,
                () -> filter.mightContain(null)
        );
    }
}
