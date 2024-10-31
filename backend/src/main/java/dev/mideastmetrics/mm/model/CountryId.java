package dev.mideastmetrics.mm.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.lang.Integer;


@Embeddable
@Data
@NoArgsConstructor
public class CountryId implements Serializable {
    private String countryName;
    private Integer year;

    public CountryId(String countryName, Integer year) {
        this.countryName = countryName;
        this.year = year;
    }

}
