package dev.mideastmetrics.mm.repository;

import dev.mideastmetrics.mm.model.CountryData;
import dev.mideastmetrics.mm.model.CountryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Year;
import java.util.List;


@Repository
public interface CountryDataRepo extends JpaRepository<CountryData, String> {
    CountryData findByCountryId(CountryId countryId);
    List<CountryData> findByCountryIdCountryName(String countryName);
    List<CountryData> findByCountryIdCountryNameAndCountryIdYear(String countryName, Year year);
}
