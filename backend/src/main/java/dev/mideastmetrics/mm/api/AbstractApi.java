package dev.mideastmetrics.mm.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.ParameterizedType;
import java.net.URI;

public abstract class AbstractApi<T> {

    protected RestTemplate restTemplate = new RestTemplate();

    protected  <T> T fetchData(URI apiUrl, HttpMethod method, Class<T> responseType) {
        ResponseEntity<T> response = restTemplate.exchange(apiUrl, method, HttpEntity.EMPTY, responseType);
        return response.getBody();
    }
}
