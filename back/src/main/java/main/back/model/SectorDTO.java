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
public class SectorDTO {

    @Id
    private Long key;

    private String label;

    private List<SectorDTO> children = new ArrayList<>();

}
