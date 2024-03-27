package dev.mideastmetrics.mm.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
@SuppressWarnings("SpellCheckingInspection")
public class Indicator {
    private IndicatorInfo indicator;
    private CountryInfo country;
    private String countryiso3code;
    private String date;
    private Double value;

    @JsonIgnore
    private String unit;
    @JsonIgnore
    private String obs_status;
    @JsonIgnore
    private int decimal;
}
