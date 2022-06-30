package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

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
