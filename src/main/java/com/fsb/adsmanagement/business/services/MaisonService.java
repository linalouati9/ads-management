package com.fsb.adsmanagement.business.services;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.fsb.adsmanagement.Exceptions.DuplicateException;
import com.fsb.adsmanagement.dao.entities.Maison;


public interface MaisonService {
    public List<Maison> getMaisons();
    public Optional<Maison> getMaisonById(String id);
    public Maison addMaison(Maison maison) throws DuplicateException;
    public Maison updateMaison(String id, Maison maison) throws DuplicateException;
    public void deleteMaison(String id);

    public Maison uploadImage(String id, MultipartFile[] files) throws Exception;
    public List<String> downloadImage(String id);
}
