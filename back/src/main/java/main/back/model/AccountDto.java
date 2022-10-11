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

    private String firstName;

    private String lastName;

    private int age;

    private String phoneNumber;

    private String emailAddress;

    private String seatNr;

    private String foodPreference;

    private String allergyInfo;

    @NotNull
    private boolean agreeToTerms;

    private Set<SectorDto> sectors = new HashSet<>();
}
