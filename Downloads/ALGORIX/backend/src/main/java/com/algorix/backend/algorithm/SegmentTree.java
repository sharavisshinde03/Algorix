package com.algorix.backend.algorithm;

public class SegmentTree {

    private final int n;
    private final long[] tree;

    public SegmentTree(long[] values) {
        this.n = values.length;
        this.tree = new long[Math.max(1, 4 * n)];

        if (n > 0) {
            build(values, 0, 0, n - 1);
        }
    }

    private void build(long[] values, int node, int start, int end) {
        if (start == end) {
            tree[node] = values[start];
            return;
        }

        int mid = start + (end - start) / 2;

        build(values, 2 * node + 1, start, mid);
        build(values, 2 * node + 2, mid + 1, end);

        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    public long query(int left, int right) {
        if (n == 0 || left < 0 || right >= n || left > right) {
            throw new IllegalArgumentException("Invalid query range.");
        }

        return query(0, 0, n - 1, left, right);
    }

    private long query(
            int node,
            int start,
            int end,
            int left,
            int right
    ) {
        if (right < start || end < left) {
            return 0;
        }

        if (left <= start && end <= right) {
            return tree[node];
        }

        int mid = start + (end - start) / 2;

        return query(2 * node + 1, start, mid, left, right)
                + query(2 * node + 2, mid + 1, end, left, right);
    }

    public void update(int index, long value) {
        if (index < 0 || index >= n || value < 0) {
            throw new IllegalArgumentException("Invalid update.");
        }

        update(0, 0, n - 1, index, value);
    }

    private void update(
            int node,
            int start,
            int end,
            int index,
            long value
    ) {
        if (start == end) {
            tree[node] = value;
            return;
        }

        int mid = start + (end - start) / 2;

        if (index <= mid) {
            update(2 * node + 1, start, mid, index, value);
        } else {
            update(2 * node + 2, mid + 1, end, index, value);
        }

        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }
}
