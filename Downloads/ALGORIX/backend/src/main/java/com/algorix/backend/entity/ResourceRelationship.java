package com.algorix.backend.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(
    name = "resource_relationships",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"source_id", "target_id"}
    )
)
public class ResourceRelationship {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "source_id", nullable = false)
    private Resource source;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "target_id", nullable = false)
    private Resource target;

    public UUID getId() {
        return id;
    }

    public Resource getSource() {
        return source;
    }

    public void setSource(Resource source) {
        this.source = source;
    }

    public Resource getTarget() {
        return target;
    }

    public void setTarget(Resource target) {
        this.target = target;
    }
}
