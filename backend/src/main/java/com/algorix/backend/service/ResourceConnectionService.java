package com.algorix.backend.service;

import com.algorix.backend.algorithm.DisjointSetUnion;
import com.algorix.backend.dto.ResourceGroupResponse;
import com.algorix.backend.entity.Resource;
import com.algorix.backend.entity.ResourceRelationship;
import com.algorix.backend.repository.ResourceRelationshipRepository;
import com.algorix.backend.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResourceConnectionService {

    private final ResourceRepository resourceRepository;
    private final ResourceRelationshipRepository relationshipRepository;

    public ResourceConnectionService(
            ResourceRepository resourceRepository,
            ResourceRelationshipRepository relationshipRepository
    ) {
        this.resourceRepository = resourceRepository;
        this.relationshipRepository = relationshipRepository;
    }

    @Transactional
    public void connectResources(UUID sourceId, UUID targetId) {

        if (sourceId.equals(targetId)) {
            throw new IllegalArgumentException(
                    "A resource cannot be connected to itself."
            );
        }

        Resource source = resourceRepository.findById(sourceId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Source resource not found."
                ));

        Resource target = resourceRepository.findById(targetId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Target resource not found."
                ));

        boolean existsForward =
                relationshipRepository.existsBySource_IdAndTarget_Id(
                        sourceId, targetId
                );

        boolean existsReverse =
                relationshipRepository.existsBySource_IdAndTarget_Id(
                        targetId, sourceId
                );

        if (existsForward || existsReverse) {
            return;
        }

        ResourceRelationship relationship = new ResourceRelationship();
        relationship.setSource(source);
        relationship.setTarget(target);

        relationshipRepository.save(relationship);
    }

    @Transactional(readOnly = true)
    public ResourceGroupResponse getResourceGroup(UUID resourceId) {

        List<Resource> resources = resourceRepository.findAll();

        Resource requested = resources.stream()
                .filter(resource -> resource.getId().equals(resourceId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Resource not found."
                ));

        Map<UUID, Integer> indexes = new HashMap<>();

        for (int i = 0; i < resources.size(); i++) {
            indexes.put(resources.get(i).getId(), i);
        }

        DisjointSetUnion dsu = new DisjointSetUnion(resources.size());

        List<ResourceRelationship> relationships =
                relationshipRepository.findAll();

        for (ResourceRelationship relationship : relationships) {
            Integer sourceIndex = indexes.get(
                    relationship.getSource().getId()
            );

            Integer targetIndex = indexes.get(
                    relationship.getTarget().getId()
            );

            if (sourceIndex != null && targetIndex != null) {
                dsu.union(sourceIndex, targetIndex);
            }
        }

        int requestedIndex = indexes.get(resourceId);
        int root = dsu.find(requestedIndex);

        List<ResourceGroupResponse.ResourceItem> group =
                resources.stream()
                        .filter(resource ->
                                dsu.find(indexes.get(resource.getId())) == root
                        )
                        .map(resource ->
                                new ResourceGroupResponse.ResourceItem(
                                        resource.getId(),
                                        resource.getTitle(),
                                        resource.getResourceType()
                                )
                        )
                        .collect(Collectors.toList());

        return new ResourceGroupResponse(resourceId, group);
    }
}
