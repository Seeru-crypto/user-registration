package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
public class AccountDto {

    @Id
    private Long id;

    private String name;

    @NotNull
    private boolean agreeToTerms;

    private Set<SectorDto> sectors = new HashSet<>();
}
