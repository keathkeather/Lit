package com.CSIT321.backend.Service;
import com.CSIT321.backend.Entity.RolesEntity;
import com.CSIT321.backend.Repository.RolesRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolesServices {
    @Autowired
    RolesRepository rolesRepository;
    public RolesEntity insertRole(RolesEntity role){
        return rolesRepository.save(role);
    }
    public List<RolesEntity> getAllRoleEntities(){
        return rolesRepository.findAll();
    }
    @SuppressWarnings("finally")
    public RolesEntity updateRole(int rid,RolesEntity newRolesEntity){
        RolesEntity role = new RolesEntity();
        try{
            role = rolesRepository.findById(rid).get();
            role.setRole_name(newRolesEntity.getRole_name());
            role.setRole_description(newRolesEntity.getRole_description());
        }catch(NoSuchElementException ex){
            throw new NoSuchElementException("Role " + rid + "Does not exist");
        }finally{
            return rolesRepository.save(role);
        }
    }
    public String deleteRole(int rid){
        String msg = "";
        Optional<RolesEntity> optionalRole = rolesRepository.findById(rid);
        if(optionalRole.isPresent()){
            rolesRepository.deleteById(rid);
            msg = "Role " + rid + " deleted";
        }
        else{
            msg = "Role " + rid + " does not exist";
        }
        return msg;
    }
}
