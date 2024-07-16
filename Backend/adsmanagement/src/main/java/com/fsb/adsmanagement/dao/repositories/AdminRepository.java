package com.fsb.adsmanagement.dao.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.fsb.adsmanagement.dao.entities.Admin;

public interface AdminRepository extends MongoRepository<Admin, String>{
    
}
