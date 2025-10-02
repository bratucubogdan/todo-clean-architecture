package com.example.sprinkle;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
 public class Sprinkle {
    public Sprinkle(String neighbourhood, boolean water, boolean power) {
        this.neighbourhood = neighbourhood;
        this.water = water;
        this.power = power;
    }

    public Sprinkle() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Integer id;
    private String neighbourhood;
    private boolean water;
    private boolean power;

    @Override
    public String toString() {
        return "Sprinkle{" +
                "id=" + id +
                ", neighbourhood='" + neighbourhood + '\'' +
                ", water=" + water +
                ", power=" + power +
                '}';
    }

    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    public String getNeighbourhood() {
        return neighbourhood;
    }

    public void setPower(boolean power) {
        this.power = power;
    }

    public boolean isPower() {
        return power;
    }

    public boolean isWater() {
        return water;
    }

    public void setWater(boolean water) {
        this.water = water;
    }
}


