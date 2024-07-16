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

import com.fsb.adsmanagement.business.services.MaisonService;
import com.fsb.adsmanagement.dao.entities.Maison;
import com.fsb.adsmanagement.dao.repositories.MaisonRepository;

import com.fsb.adsmanagement.Exceptions.DuplicateException;

@Service
public class MaisonServiceImpl implements MaisonService{

    private final MaisonRepository maisonRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    
    public MaisonServiceImpl(MaisonRepository maisonRepository){
        this.maisonRepository = maisonRepository;
    }

    @Override
    public List<Maison> getMaisons() {
        List<Maison> maisons = this.maisonRepository.findAll();
        return maisons;
    }

    @Override
    public Optional<Maison> getMaisonById(String id) {
        return this.maisonRepository.findById(id);
        }

    @Override
    public Maison addMaison(Maison maison) throws DuplicateException{
        try {
            System.out.println(maison);
            return this.maisonRepository.save(maison);
        } catch (Exception e) {
            throw new DuplicateException("Une maison avec cette id existe déja: "+e.getMessage());
        }
    }

    @Override
    public Maison updateMaison(String id, Maison maison) throws DuplicateException {
        if (maisonRepository.existsById(id)) {
            try {
                return maisonRepository.save(maison);
            } catch (DataIntegrityViolationException e) {
                throw new DuplicateException("Une maison avec les mêmes caractéristiques existe déjà.");
            }
        } else {
            throw new RuntimeException("Maison avec id: " + id + " non trouvé!");
        }
    }


    @Override
    public void deleteMaison(String id) {
        try {
            if (maisonRepository.existsById(id)) {
                maisonRepository.deleteById(id);

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
            
        }} catch (DataAccessException | IOException e) {
            throw new RuntimeException("Échec de suppression de la maison avec l'id: " + id, e);
        }
    }

    @Override
    public Maison uploadImage(String id, MultipartFile[] files) throws Exception {
        Maison maison = maisonRepository.findById(id)
                .orElseThrow(() -> new Exception("Maison non trouvé"));

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        List<String> imagePaths;
        if(!maison.getImages().isEmpty()){
            imagePaths = maison.getImages();
        }else {
            imagePaths = new ArrayList<>();
        }

        for (MultipartFile file : files) {
            String fileName = id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName;
            Path path = Paths.get(filePath);
            Files.write(path, file.getBytes());
            //Dans la base de donnés, on stocke les noms des images de la maison
            imagePaths.add(fileName);
        }

        maison.setImages(imagePaths);
        return maisonRepository.save(maison);
    }

    @Override
    public List<String> downloadImage(String id) {
        //C'est plus correct 
        //Maison maison = maisonRepository.findById(id)
        //.orElseThrow(() -> new Exception("Maison non trouvé"));

        Optional<Maison> maisonOptional = maisonRepository.findById(id);
        if (maisonOptional.isPresent()) {
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
                    images.add(baseUrl+"default.jpg");
                }
                return images;
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return new ArrayList<String>();
    }

}
