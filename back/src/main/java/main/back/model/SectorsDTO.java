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
public class SectorsDTO {

    @Id
    private Long key;

    private String label;

    private List<SectorsDTO> children = new ArrayList<>();

}
