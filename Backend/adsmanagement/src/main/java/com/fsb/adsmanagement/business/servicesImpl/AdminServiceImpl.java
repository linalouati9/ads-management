package com.fsb.adsmanagement.business.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fsb.adsmanagement.business.services.AdminService;
import com.fsb.adsmanagement.dao.entities.Admin;
import com.fsb.adsmanagement.dao.repositories.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public List<Admin> getAllAdmins() {
        return this.adminRepository.findAll();
    }

    @Override
    public boolean isAdmin(Admin admin) {
        List<Admin> admins = adminRepository.findAll();
        Optional<Admin> administrateur =  admins.stream()
                                        .filter(a -> a.getUsername().equals(admin.getUsername()) && 
                                                    a.getPassword().equals(admin.getPassword()))
                                        .findFirst(); // Trouve le premier admin correspondant
        return administrateur.isPresent();
    }  
}
