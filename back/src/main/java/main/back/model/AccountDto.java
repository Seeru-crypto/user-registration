package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
@ToString
public class AccountDto {

    @Id
    private Long id;

    private String name;

    @NotNull
    private boolean agreeToTerms;

    private List<Long> selectedSectors = new ArrayList<>();
}
