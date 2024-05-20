package dev.mideastmetrics.mm.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Year;

@Embeddable
@Data
@NoArgsConstructor
public class CountryId implements Serializable {
    private String countryName;
    private Year year;

    public CountryId(String countryName, Year year) {
        this.countryName = countryName;
        this.year = year;
    }

}
