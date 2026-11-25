package com.algorix.backend.algorithm;

public class DisjointSetUnion {

    private final int[] parent;
    private final int[] rank;
    private int components;

    public DisjointSetUnion(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("Size cannot be negative");
        }

        parent = new int[size];
        rank = new int[size];
        components = size;

        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
    }

    public int find(int value) {
        validate(value);

        if (parent[value] != value) {
            parent[value] = find(parent[value]);
        }

        return parent[value];
    }

    public boolean union(int first, int second) {
        int rootA = find(first);
        int rootB = find(second);

        if (rootA == rootB) {
            return false;
        }

        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }

        components--;
        return true;
    }

    public boolean connected(int first, int second) {
        return find(first) == find(second);
    }

    public int getComponentCount() {
        return components;
    }

    private void validate(int value) {
        if (value < 0 || value >= parent.length) {
            throw new IndexOutOfBoundsException(
                    "Invalid DSU element: " + value
            );
        }
    }
}
