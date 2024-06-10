package com.fsb.adsmanagement.business.services;

import java.util.List;
import com.fsb.adsmanagement.dao.entities.Admin;


public interface AdminService {
    
    public List<Admin> getAllAdmins();
    public boolean isAdmin(Admin admin);
    
}
