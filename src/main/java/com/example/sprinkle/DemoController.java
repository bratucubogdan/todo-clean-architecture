package com.example.sprinkle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController

public class DemoController {
@Autowired
    private SprinkleRepository sprinkleRepository;

    @PostMapping("/add")
    public String addSprinkle(@RequestBody Sprinkle sprinkle){
        sprinkleRepository.save(sprinkle);
        return "Added new sprinkle to the database";
    }

    @GetMapping("/list")
    public Iterable<Sprinkle> getSprinkle(){
        return  sprinkleRepository.findAll();
    }
    @GetMapping("/sprinkleById/{id}")
    public Sprinkle getSprinkleById(@PathVariable Integer id){
        return sprinkleRepository.getSprinklesById(id);
    }
        @GetMapping("/sprinkleByNeighbourhood/{neighbourhood}")
    public Sprinkle getSprinkleByNeighbourhood(@PathVariable String neighbourhood){
        return sprinkleRepository.getSprinklesByNeighbourhood(neighbourhood);
    }

}
