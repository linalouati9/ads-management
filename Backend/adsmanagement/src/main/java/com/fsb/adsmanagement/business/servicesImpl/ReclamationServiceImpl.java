package com.fsb.adsmanagement.business.servicesImpl;

import org.springframework.stereotype.Service;

import com.fsb.adsmanagement.business.services.ReclamationService;
import com.fsb.adsmanagement.dao.entities.Reclamation;
import com.fsb.adsmanagement.dao.repositories.ReclamationRepository;

@Service
public class ReclamationServiceImpl implements ReclamationService{
    
    private final ReclamationRepository reclamationRepository;

    public ReclamationServiceImpl(ReclamationRepository reclamationRepository){
        this.reclamationRepository = reclamationRepository;
    }

    @Override
    public Reclamation addReclamation(Reclamation reclamation) {
        return this.reclamationRepository.save(reclamation);
    }

    
}
