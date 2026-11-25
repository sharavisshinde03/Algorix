package com.algorix.backend.repository;

import com.algorix.backend.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResourceRepository extends JpaRepository<Resource, UUID> {

    boolean existsByTitleIgnoreCase(String title);

    Optional<Resource> findByTitleIgnoreCase(String title);

    boolean existsByResourceUrlIgnoreCase(String resourceUrl);

    Optional<Resource> findByResourceUrlIgnoreCase(String resourceUrl);

    List<Resource> findByTitleContainingIgnoreCaseOrResourceTypeContainingIgnoreCase(
            String title,
            String resourceType
    );
}
