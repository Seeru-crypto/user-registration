package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.FetchType.LAZY;

@Getter
@Setter
@Entity
@ToString
@Table(name = "account")
public class Account {
    public static final int MAX_NAME_LEN = 26;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true)
    private Long id;

    @NotBlank(message = "First name is mandatory")
    @Size(min = 1, max = MAX_NAME_LEN, message = "First name is mandatory")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "last name is mandatory")
    @Size(min = 1, max = MAX_NAME_LEN, message = "last name is mandatory")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull(message = "age is mandatory")
    @Column(nullable = false)
    private int age;

    @NotBlank(message = "Phone number is mandatory")
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotBlank(message = "Email aadress is mandatory")
    @Column(name = "email_aadress", nullable = false)
    private String emailAddress;

    @NotBlank(message = "seat_number is mandatory")
    @Column(name = "seat_number", nullable = false)
    private String seatNr;

    @NotBlank(message = "food_preferance is mandatory")
    @Column(name = "food_preferance", nullable = false)
    private String foodPreference;

    @NotBlank(message = "allergyInfo is mandatory")
    @Column(name = "allergy_preferance", nullable = false)
    private String allergyInfo;

    @Column(nullable = false, name = "date_added")
    @PastOrPresent(message = "Date added, must be in the present")
    private Instant dateAdded;

    @Column(name = "date_updated")
    @PastOrPresent(message = "Date updated, must be in the present")
    private Instant dateUpdated;

    @Column(name = "agree_to_terms")
    @NotNull
    private boolean agreeToTerms;

    @ManyToMany(fetch = LAZY,
            cascade = MERGE)
    @JoinTable(
            name = "account_sectors",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "sector_id")
    )
    Set<Sector> sectors = new HashSet<>();

    public Account setSectors(Collection<Sector> sectors) {
        this.sectors.clear();
        this.sectors.addAll(sectors);
        return this;
    }
}
