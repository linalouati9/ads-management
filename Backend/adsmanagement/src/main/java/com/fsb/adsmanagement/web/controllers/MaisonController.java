package com.fsb.adsmanagement.web.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fsb.adsmanagement.dao.entities.Maison;
import com.fsb.adsmanagement.Exceptions.DuplicateException;
import com.fsb.adsmanagement.business.services.MaisonService;

@RestController
@RequestMapping("/maisons")
public class MaisonController {
    
    public final MaisonService maisonService;

    public MaisonController(MaisonService maisonService){
        this.maisonService = maisonService;
    }
    @GetMapping()
    public ResponseEntity<?> getMaisons() {
        List<Maison> maisons = this.maisonService.getMaisons();
        return new ResponseEntity<>(maisons, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMaisonById(@PathVariable String id) {
        Optional<Maison> maison = this.maisonService.getMaisonById(id);
        return new ResponseEntity<>(maison, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> addMaison(@RequestBody Maison maison) throws DuplicateException {
        return new ResponseEntity<>(this.maisonService.addMaison(maison), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMaison(@PathVariable String id, @RequestBody Maison maison) throws DuplicateException {
        return new ResponseEntity<>(this.maisonService.updateMaison(id, maison), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMaison(@PathVariable String id) {
        this.maisonService.deleteMaison(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);

    }
  
    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@RequestParam String id, @RequestParam("files") MultipartFile[] files) throws Exception {
        try {
            Maison maison = maisonService.uploadImage(id, files);
            return new ResponseEntity<>(maison, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Erreur lors du téléchargement des images", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable String id) {
        List<String> images = maisonService.downloadImage(id);
        if(!images.isEmpty()){
            return ResponseEntity.ok().body(images);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
