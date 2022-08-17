package com.example.sprinkle;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

public class Weather {

    private JsonObject api() throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://api.openweathermap.org/data/2.5/weather?lat=44.43278&lon=26.10389&appid=126304ed361f0aaa733a4a9bc0a1573f&units=metric")
                .build();
        Response response = client.newCall(request).execute();
        String jsonResponse = response.body().string();
        JsonObject weather = JsonParser.parseString(jsonResponse).getAsJsonObject();
        return weather;
    }

    public Map<String, Double> getTempDays () throws IOException {


        ObjectMapper objectMapper = new ObjectMapper();
        JsonObject tempJson = api();
        String tempString = tempJson.get("main").toString();
        Reader reader = new StringReader(tempString);
        Map<String, Double> tempMap = objectMapper.readValue(reader, Map.class);


        return tempMap;
    }
    public Map<String, String> getSky() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonObject skyJson = api();
        String skyString = skyJson.get("weather").getAsJsonArray().get(0).toString();
        Reader reader = new StringReader(skyString);
        Map<String, String> skyMap = objectMapper.readValue(reader, Map.class);

        return skyMap;
    }
}
