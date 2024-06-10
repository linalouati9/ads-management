package com.fsb.adsmanagement.business.servicesImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.fsb.adsmanagement.Exceptions.DuplicateException;
import com.fsb.adsmanagement.business.services.TerrainService;
import com.fsb.adsmanagement.dao.entities.Terrain;
import com.fsb.adsmanagement.dao.repositories.TerrainRepository;


@Service
public class TerrainServiceImpl implements TerrainService{

    private final TerrainRepository terrainRepository;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    public TerrainServiceImpl(TerrainRepository terrainRepository){
        this.terrainRepository = terrainRepository;
    }

    @Override
    public List<Terrain> getTerrains() {
        return this.terrainRepository.findAll();
    }

    @Override
    public Optional<Terrain> getTerrainById(String id) {
        return this.terrainRepository.findById(id);
    }

    @Override
    public Terrain addTerrain(Terrain terrain) throws DuplicateException {
        try {
            return this.terrainRepository.save(terrain);
        } catch (Exception e) {
            throw new DuplicateException("Un terrain avec cette id existe déja: "+e.getMessage());
        }    
    } 

    @Override
    public Terrain updateTerrain(String id, Terrain terrain) throws DuplicateException {
        if(this.terrainRepository.existsById(id)){
            try{
                return this.terrainRepository.save(terrain);
            }catch(DataIntegrityViolationException e){
                throw new DuplicateException(
                    "Un terrain avec les memes caractéristiques existe déja..");
            }
        } else {
            throw new RuntimeException("Terrain avec id: " + id + " non trouvé");
        }
    }

    @Override
    public void deleteTerrain(String id) {
        try {
            if (terrainRepository.existsById(id)) {
                terrainRepository.deleteById(id);

                List<File> files = Files.list(Paths.get(uploadDir))
                                        .filter(path -> path.getFileName().toString().startsWith(id))
                                        .map(Path::toFile)
                                        .collect(Collectors.toList());

                // Supprimer chaque fichier
                for (File file : files) {
                    if (file.exists()) {
                        file.delete();
                    }
                }
            }
        } catch (DataAccessException | IOException e) {
            throw new RuntimeException("Échec lors de la suppression du terrain avec l'id: " + id, e);
        }
    }
   
    @Override
    public Terrain uploadImage(String id, MultipartFile[] files) throws Exception {
        Terrain terrain = terrainRepository.findById(id)
                .orElseThrow(() -> new Exception("Terrain non trouvé"));

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        List<String> imagePaths;
        if(!terrain.getImages().isEmpty()){
            imagePaths = terrain.getImages();
        }else {
            imagePaths = new ArrayList<>();
        }

        for (MultipartFile file : files) {
            String fileName = id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName;
            Path path = Paths.get(filePath);
            Files.write(path, file.getBytes());
            imagePaths.add(fileName);
        }

        terrain.setImages(imagePaths);
        return terrainRepository.save(terrain);
    }

    @Override
    public List<String> downloadImage(String id) {
        Optional<Terrain> terrainOptional = terrainRepository.findById(id);
        if (terrainOptional.isPresent()) {
            String baseUrl = "http://localhost:8085/uploads/";
            List<String> images = new ArrayList<>();

            try {
                List<File> files = Files.list(Paths.get(uploadDir))
                                        .filter(path -> path.getFileName().toString().startsWith(id))
                                        .map(Path::toFile)
                                        .collect(Collectors.toList());
                
                if (!files.isEmpty()) {
                    for (File file : files) {
                        images.add(baseUrl+file.getName());
                    }
                } else {
                    images.add(baseUrl+"default-terrain.jpg");
                }
                return images;
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return new ArrayList<String>();
    }

}