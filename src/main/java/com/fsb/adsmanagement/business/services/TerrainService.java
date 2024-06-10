package com.fsb.adsmanagement.business.services;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.fsb.adsmanagement.Exceptions.DuplicateException;
import com.fsb.adsmanagement.dao.entities.Terrain;


public interface TerrainService {
    public List<Terrain> getTerrains();
    public Optional<Terrain> getTerrainById(String id);
    public Terrain addTerrain(Terrain terrain) throws DuplicateException;
    public Terrain updateTerrain(String id, Terrain terrain) throws DuplicateException;
    public void deleteTerrain(String id);

    public Terrain uploadImage(String id, MultipartFile[] files) throws Exception;
    public List<String> downloadImage(String id);

}
