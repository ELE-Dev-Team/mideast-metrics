package dev.mideastmetrics.mm.service;

import dev.mideastmetrics.mm.api.WorldBankApi;
import dev.mideastmetrics.mm.dto.Indicator;
import dev.mideastmetrics.mm.model.CountryData;
import dev.mideastmetrics.mm.model.CountryId;
import dev.mideastmetrics.mm.repository.CountryDataRepo;
import dev.mideastmetrics.mm.util.SetterMethod;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Year;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryDataService {
    private CountryDataRepo countryDataRepo;
    private WorldBankApi worldBankApi;

    @Getter
    private final static HashMap<String, SetterMethod> indicatorToSetterMap = new HashMap<>();

    static {
        // Money related
        indicatorToSetterMap.put("NY.GDP.MKTP.KD.ZG", CountryData::setGdpGrowth);
        indicatorToSetterMap.put("GC.TAX.GSRV.RV.ZS", CountryData::setTaxes);
        indicatorToSetterMap.put("NE.IMP.GNFS.ZS", CountryData::setImportsOfGoodsAndServices);
        indicatorToSetterMap.put("NY.GDP.PCAP.CD", CountryData::setGdpPerCapita);
        indicatorToSetterMap.put("NY.GDP.MKTP.CD", CountryData::setGdpValue);
        indicatorToSetterMap.put("PA.NUS.PPP", CountryData::setPppValue);

        // Life Expectancy
        indicatorToSetterMap.put("SP.DYN.LE00.MA.IN", CountryData::setLifeExpectancyM);
        indicatorToSetterMap.put("SP.DYN.LE00.FE.IN", CountryData::setLifeExpectancyF);
        indicatorToSetterMap.put("SP.DYN.LE00.IN", CountryData::setLifeExpectancyT);

        // Population
        indicatorToSetterMap.put("SP.POP.TOTL.MA.IN", CountryData::setMalePop);
        indicatorToSetterMap.put("SP.POP.TOTL.FE.IN", CountryData::setFemalePop);

        indicatorToSetterMap.put("SM.POP.NETM", CountryData::setNetMigration);

        // Mortality Rate
        indicatorToSetterMap.put("SP.DYN.AMRT.FE", CountryData::setMortalityRateF);
        indicatorToSetterMap.put("SP.DYN.AMRT.MA", CountryData::setMortalityRateM);

        // Birth Rate
        indicatorToSetterMap.put("SP.DYN.CBRT.IN", CountryData::setCrudeBirthRateT);

        // Unemployment rate
        indicatorToSetterMap.put("SL.UEM.TOTL.ZS", CountryData::setUnemploymentRateT);
        indicatorToSetterMap.put("SL.UEM.TOTL.FE.ZS", CountryData::setUnemploymentRateF);
        indicatorToSetterMap.put("SL.UEM.TOTL.MA.NE.ZS", CountryData::setUnemploymentRateM);
    }

    @Autowired
    public CountryDataService(CountryDataRepo countryDataRepo) {
        this.countryDataRepo = countryDataRepo;
        this.worldBankApi = new WorldBankApi();
    }

    public void loadAllDataFromApi() {
        final String[] countries = new String[] {"dz", "bh", "km", "dj", "eg", "iq", "jo", "kw", "lb", "ly",
                "mr", "ma", "om", "ps", "qa", "sa", "so", "sd", "sy", "tn", "ae", "ye"};

        System.out.println("[!] Started data loading process...");
        for (int i = 0; i < countries.length; i++) {
            String iso2Code = countries[i];
            for (String indicatorCode : indicatorToSetterMap.keySet()) {
                List<Indicator> indicators = worldBankApi.fetchData(iso2Code, indicatorCode);

                List<CountryData> countriesData = indicators.stream()
                        .map(indicator -> {
                            CountryData countryData = mapToCountry(indicator);
                            countryData.setTotalPop(countryData.getFemalePop() + countryData.getMalePop());
                            countryData.setMortalityRateT(countryData.getMortalityRateF() + countryData.getMortalityRateM());
                            return countryData;
                        })
                        .collect(Collectors.toList());

                countryDataRepo.saveAll(countriesData);
            }
            System.out.printf("[+] Successfully loaded data for '%s' (%d/%d)%n", iso2Code, i+1, countries.length);
        }
        System.out.println("[+] Data has been loaded successfully...");
    }

    private CountryData mapToCountry(Indicator indicator) {
        String countryName = cleanCountryName(indicator.getCountry().getValue());
        Year year = null;

        try {
            year = Year.parse(indicator.getDate());
        } catch (DateTimeParseException e) {
            e.printStackTrace();
        }

        CountryData countryData = countryDataRepo.findByCountryId(new CountryId(countryName, year));

        if (countryData == null)
            countryData = new CountryData(countryName, year);

        SetterMethod setterMethod = indicatorToSetterMap.get(indicator.getIndicator().getId());

        if (setterMethod != null) {
            if (indicator.getValue() != null)
                setterMethod.set(countryData, indicator.getValue());
        } else {
            System.out.println("Setter method is null for indicator: " + indicator.getIndicator().getId());
        }

        if(countryData == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CountryData Not Found");
        }
        return countryData;
    }

    public List<CountryData> getCountryData(String countryName, Year year) {
        if(year != null) {
            return countryDataRepo.findByCountryIdCountryNameAndCountryIdYear(countryName, year);
        } else {
            return countryDataRepo.findByCountryIdCountryName(countryName);
        }
    }

    private String cleanCountryName(String countryName) {
        countryName = countryName.replace(", Arab Rep.", "")
                .replace("Arab Republic", "")
                .replace("West Bank and Gaza", "Palestine")
                .replace(", Rep.", "");

        countryName = countryName.toLowerCase().trim();

        return countryName;
    }

}