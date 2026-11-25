package com.algorix.backend.algorithm;

import java.util.concurrent.ThreadLocalRandom;

public class QuickSelect {

    // Finds the kth largest element. k is 1-based.
    public int findKthLargest(int[] values, int k) {

        if (values == null || k < 1 || k > values.length) {
            throw new IllegalArgumentException(
                    "Invalid k or input array"
            );
        }

        int[] copy = values.clone();
        int target = copy.length - k;

        return select(copy, 0, copy.length - 1, target);
    }

    private int select(
            int[] values,
            int left,
            int right,
            int target
    ) {

        while (left <= right) {

            int pivotIndex = ThreadLocalRandom.current()
                    .nextInt(left, right + 1);

            pivotIndex = partition(
                    values,
                    left,
                    right,
                    pivotIndex
            );

            if (pivotIndex == target) {
                return values[pivotIndex];
            }

            if (pivotIndex < target) {
                left = pivotIndex + 1;
            } else {
                right = pivotIndex - 1;
            }
        }

        throw new IllegalStateException("Selection failed");
    }

    private int partition(
            int[] values,
            int left,
            int right,
            int pivotIndex
    ) {

        int pivot = values[pivotIndex];

        swap(values, pivotIndex, right);

        int storeIndex = left;

        for (int i = left; i < right; i++) {

            if (values[i] < pivot) {
                swap(values, storeIndex, i);
                storeIndex++;
            }
        }

        swap(values, storeIndex, right);

        return storeIndex;
    }

    private void swap(int[] values, int a, int b) {

        int temp = values[a];
        values[a] = values[b];
        values[b] = temp;
    }
}