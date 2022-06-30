package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@ToString
@Table(name = "sector")
public class Sectors {
    @Id
    @GeneratedValue(strategy= IDENTITY)
    @Column(unique = true)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "value is mandatory")
    @Column(nullable = false)
    private int value;

    @Column(name = "parent_id")
    private int parentId;

}
