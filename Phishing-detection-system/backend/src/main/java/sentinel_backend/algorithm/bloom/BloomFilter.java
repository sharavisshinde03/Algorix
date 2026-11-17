
package sentinel_backend.algorithm.bloom;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.BitSet;

public class BloomFilter {

    private final BitSet bitArray;
    private final int bitSize;
    private final int hashCount;

    public BloomFilter(int expectedInsertions, double falsePositiveRate) {

        if (expectedInsertions <= 0) {
            throw new IllegalArgumentException(
                    "Expected insertions must be greater than zero"
            );
        }

        if (falsePositiveRate <= 0 || falsePositiveRate >= 1) {
            throw new IllegalArgumentException(
                    "False positive rate must be between 0 and 1"
            );
        }

        double ln2 = Math.log(2);

        double calculatedSize =
                -expectedInsertions * Math.log(falsePositiveRate)
                / (ln2 * ln2);

        if (calculatedSize > Integer.MAX_VALUE) {
            throw new IllegalArgumentException(
                    "Bloom Filter is too large"
            );
        }

        this.bitSize = Math.max(1, (int) Math.ceil(calculatedSize));

        this.hashCount = Math.max(
                1,
                (int) Math.round(
                        ((double) bitSize / expectedInsertions) * ln2
                )
        );

        this.bitArray = new BitSet(bitSize);
    }

    public void add(String value) {

        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(
                    "Value cannot be empty"
            );
        }

        long[] hashes = generateHashes(value);

        for (int i = 0; i < hashCount; i++) {

            int index = (int) Math.floorMod(
                    hashes[0] + i * hashes[1],
                    (long) bitSize
            );

            bitArray.set(index);
        }
    }

    public boolean mightContain(String value) {

        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(
                    "Value cannot be empty"
            );
        }

        long[] hashes = generateHashes(value);

        for (int i = 0; i < hashCount; i++) {

            int index = (int) Math.floorMod(
                    hashes[0] + i * hashes[1],
                    (long) bitSize
            );

            if (!bitArray.get(index)) {
                return false;
            }
        }

        return true;
    }

    private long[] generateHashes(String value) {

        try {
            MessageDigest digest =
                    MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(
                    value.getBytes(StandardCharsets.UTF_8)
            );

            ByteBuffer buffer = ByteBuffer.wrap(hash);

            long hash1 = buffer.getLong();
            long hash2 = buffer.getLong() | 1L;

            return new long[]{hash1, hash2};

        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(
                    "SHA-256 is not available",
                    exception
            );
        }
    }

    public int getBitSize() {
        return bitSize;
    }

    public int getHashCount() {
        return hashCount;
    }
}
