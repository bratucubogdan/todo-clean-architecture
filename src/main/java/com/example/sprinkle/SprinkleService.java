package com.example.sprinkle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SprinkleService {

    @Autowired
    SprinkleRepository sprinkleRepository;


    @Scheduled(cron = "* * 7/19 * * *")
    public void sprinkleStateUpdateOn() throws IOException {
        Weather weather = new Weather();
        double z = weather.getTempDays().get("temp");
        String sky = weather.getSky().get("main");

        if(!sky.equals("Rain")){
            for(Sprinkle s: sprinkleRepository.findAll()){
                sprinkleRepository.setSprinkeStateById(true, true, s.getId());
            }
        }

        System.out.println(sprinkleRepository.findAll());

    }
    @Scheduled(cron = "* 30 7/19 * * *")
    public void sprinkleUpdateOff() {
        for(Sprinkle s: sprinkleRepository.findAll()){
            sprinkleRepository.setSprinkeStateById(false, false, s.getId());
        }
        System.out.println(sprinkleRepository.findAll());
    }
}
