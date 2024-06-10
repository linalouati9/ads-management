package com.fsb.adsmanagement.dao.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fsb.adsmanagement.dao.entities.Maison;

public interface MaisonRepository extends MongoRepository<Maison, String>{
    
}
