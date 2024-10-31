package dev.mideastmetrics.mm.controller;

import dev.mideastmetrics.mm.model.CountryData;
import dev.mideastmetrics.mm.service.CountryDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.Year;
import java.util.List;


@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/countries")
public class CountryController {

    private CountryDataService countryDataService;

    @Autowired
    public CountryController(CountryDataService countryDataService) {
        this.countryDataService = countryDataService;
    }

    @GetMapping()
    public ResponseEntity<List<CountryData>> getCountryData(@RequestParam("name") String countryName,
                                                            @RequestParam(value="year", required = false) Integer year) {
        List<CountryData> data = countryDataService.getCountryData(countryName, year);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
