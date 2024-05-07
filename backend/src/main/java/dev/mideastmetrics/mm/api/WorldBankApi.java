package dev.mideastmetrics.mm.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.mideastmetrics.mm.dto.Indicator;
import org.springframework.http.HttpMethod;

import java.net.URI;
import java.util.List;

public class WorldBankApi extends AbstractApi {
    private final String BASE_URL = "http://api.worldbank.org/v2/en/country/";
    // http://api.worldbank.org/v2/en/country/ind;chn/indicator/DPANUSSPF?format=json

    public WorldBankApi() {
    }

    public List<Indicator> fetchData(String country, String indicator) {
        URI apiUri = URI.create(BASE_URL + country + "/indicator/" + indicator + "?format=json&per_page=63");

        JsonNode apiResponse = (JsonNode) super.fetchData(apiUri, HttpMethod.GET, JsonNode.class);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Indicator> indicatorsData;
        try {
            indicatorsData = objectMapper.readValue(apiResponse.get(1).toString(), new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return indicatorsData;
    }
}
