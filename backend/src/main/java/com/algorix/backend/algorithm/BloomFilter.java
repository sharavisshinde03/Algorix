package com.algorix.backend.algorithm;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.BitSet;

public class BloomFilter {

    private final BitSet bits;
    private final int size;
    private final int hashCount;

    public BloomFilter(int size, int hashCount) {
        if (size <= 0 || hashCount <= 0) {
            throw new IllegalArgumentException(
                    "Size and hash count must be positive"
            );
        }

        this.size = size;
        this.hashCount = hashCount;
        this.bits = new BitSet(size);
    }

    public void add(String value) {
        if (value == null) return;

        long[] hashes = hash(value);

        for (int i = 0; i < hashCount; i++) {
            bits.set(index(hashes[0] + i * hashes[1]));
        }
    }

    public boolean mightContain(String value) {
        if (value == null) return false;

        long[] hashes = hash(value);

        for (int i = 0; i < hashCount; i++) {
            if (!bits.get(index(hashes[0] + i * hashes[1]))) {
                return false;
            }
        }

        return true;
    }

    private int index(long hash) {
        return (int) Math.floorMod(hash, (long) size);
    }

    private long[] hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(
                    value.toLowerCase().getBytes(StandardCharsets.UTF_8)
            );

            long first = 0;
            long second = 0;

            for (int i = 0; i < 8; i++) {
                first = (first << 8) | (bytes[i] & 0xffL);
                second = (second << 8) | (bytes[i + 8] & 0xffL);
            }

            return new long[]{first, second | 1L};

        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Hash algorithm unavailable", e);
        }
    }
}
