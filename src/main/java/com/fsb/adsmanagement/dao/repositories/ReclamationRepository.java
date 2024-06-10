package com.fsb.adsmanagement.dao.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.fsb.adsmanagement.dao.entities.Reclamation;

public interface ReclamationRepository extends MongoRepository<Reclamation, ObjectId>{
    
}
