package com.algorix.backend.repository;

import com.algorix.backend.entity.ResourceRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ResourceRelationshipRepository
        extends JpaRepository<ResourceRelationship, UUID> {

    boolean existsBySource_IdAndTarget_Id(UUID sourceId, UUID targetId);

    List<ResourceRelationship> findAll();
}
