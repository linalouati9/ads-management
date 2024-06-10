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

import com.fsb.adsmanagement.Exceptions.DuplicateException;
import com.fsb.adsmanagement.business.services.TerrainService;
import com.fsb.adsmanagement.dao.entities.Terrain;

@RestController
@RequestMapping("/terrains")
public class TerrainController{

    public final TerrainService terrainService;

    public TerrainController(TerrainService terrainService){
        this.terrainService = terrainService;
    }
    @GetMapping()
    public ResponseEntity<?> getTerrains() {
        List<Terrain> terrains = this.terrainService.getTerrains();
        return new ResponseEntity<>(terrains, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTerrainById(@PathVariable String id) {
        Optional<Terrain> terrain = this.terrainService.getTerrainById(id);
        return new ResponseEntity<>(terrain, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> addTerrain(@RequestBody Terrain terrain) throws DuplicateException {
        return new ResponseEntity<>(this.terrainService.addTerrain(terrain), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTerrain(@PathVariable String id, @RequestBody Terrain terrain) throws DuplicateException {
        return new ResponseEntity<>(this.terrainService.updateTerrain(id, terrain), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTerrain(@PathVariable String id) {
        this.terrainService.deleteTerrain(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);

    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@RequestParam String id, @RequestParam("files") MultipartFile[] files) throws Exception {
        try {
            Terrain terrain = terrainService.uploadImage(id, files);
            return new ResponseEntity<>(terrain, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Erreur lors du téléchargement des images", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadImage(@PathVariable String id) {
        List<String> images = terrainService.downloadImage(id);
        if(!images.isEmpty()){
            return ResponseEntity.ok().body(images);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

}
