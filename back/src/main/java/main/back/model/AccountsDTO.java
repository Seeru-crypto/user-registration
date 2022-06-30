package main.back.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class AccountsDTO {

    @Id
    private Long id;

    private String name;

    private List<Long> selectedSectors = new ArrayList<>();
}
