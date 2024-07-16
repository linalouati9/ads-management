package com.fsb.adsmanagement.web.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fsb.adsmanagement.business.services.AdminService;
import com.fsb.adsmanagement.dao.entities.Admin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping()
    public ResponseEntity<?> getAllAdmins() {
        List<Admin> admins = this.adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> isAdmin(@RequestBody Admin admin) {
        boolean estAdmin = this.adminService.isAdmin(admin);
        if (estAdmin) {
            return new ResponseEntity<>(true, HttpStatus.OK); // Administrateur trouvé
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK); // Administrateur non trouvé
        }
    }

}
