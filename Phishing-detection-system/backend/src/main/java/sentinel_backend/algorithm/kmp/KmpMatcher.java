
package sentinel_backend.algorithm.kmp;

import java.util.ArrayList;
import java.util.List;

public class KmpMatcher {

    public boolean contains(String text, String pattern) {
        return !findOccurrences(text, pattern).isEmpty();
    }

    public List<Integer> findOccurrences(
            String text,
            String pattern) {

        if (text == null || pattern == null) {
            throw new IllegalArgumentException(
                    "Text and pattern cannot be null"
            );
        }

        List<Integer> occurrences = new ArrayList<>();

        if (pattern.isEmpty()) {
            throw new IllegalArgumentException(
                    "Pattern cannot be empty"
            );
        }

        int[] lps = buildLpsArray(pattern);

        int i = 0;
        int j = 0;

        while (i < text.length()) {

            if (text.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
            }

            if (j == pattern.length()) {

                occurrences.add(i - j);

                j = lps[j - 1];

            } else if (
                    i < text.length()
                    && text.charAt(i) != pattern.charAt(j)) {

                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return occurrences;
    }

    private int[] buildLpsArray(String pattern) {

        int[] lps = new int[pattern.length()];

        int length = 0;
        int i = 1;

        while (i < pattern.length()) {

            if (pattern.charAt(i) == pattern.charAt(length)) {

                length++;
                lps[i] = length;
                i++;

            } else {

                if (length != 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }
}
