package com.fsb.adsmanagement.dao.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fsb.adsmanagement.dao.entities.Terrain;

public interface TerrainRepository extends MongoRepository<Terrain, String>{
    

}
