package com.example.sprinkle;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface SprinkleRepository extends CrudRepository<Sprinkle, Integer> {
    Sprinkle getSprinklesById(Integer id);
    Sprinkle getSprinklesByNeighbourhood(String neighbourhood);

    @Modifying(clearAutomatically = true)
    @Query("update Sprinkle u set u.power = :power, u.water = :water where u.id = :sprinkleId")
    void setSprinkeStateById(boolean power, boolean water, Integer sprinkleId);
}

