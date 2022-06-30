package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@ToString
@Table(name = "sector")
public class Sector {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "value is mandatory")
    @Column(nullable = false)
    private int value;

    @Column(name = "parent_id")
    private int parentId;

    @OneToMany(cascade = ALL, orphanRemoval = true)
    @JoinColumn(name = "parent_id")
    private List<Sector> children = new ArrayList<>();

}
