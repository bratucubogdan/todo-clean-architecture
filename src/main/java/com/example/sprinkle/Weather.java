package com.example.sprinkle;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;


import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.Map;

public class Weather {

    private JsonObject api() throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("https://api.openweathermap.org/data/2.5/weather?lat=44.43278&lon=26.10389&appid=126304ed361f0aaa733a4a9bc0a1573f&units=metric")
                .build();
        Response response = client.newCall(request).execute();
        String jsonResponse = response.body().string();
        return JsonParser.parseString(jsonResponse).getAsJsonObject();
    }

    public Map<String, Double> getTempDays () throws IOException {


        ObjectMapper objectMapper = new ObjectMapper();
        JsonObject tempJson = api();
        String tempString = tempJson.get("main").toString();
        Reader reader = new StringReader(tempString);
        return objectMapper.readValue(reader, Map.class);
    }
    public Map<String, String> getSky() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonObject skyJson = api();
        String skyString = skyJson.get("weather").getAsJsonArray().get(0).toString();
        Reader reader = new StringReader(skyString);

        return objectMapper.readValue(reader, Map.class);
    }
}
