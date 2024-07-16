package com.fsb.adsmanagement.dao.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "admins")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
    
    @Id
    private String username;
    private String password;
}
