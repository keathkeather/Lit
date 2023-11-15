package com.CSIT321.backend.Service;
import com.CSIT321.backend.Entity.rolesEntity;
import com.CSIT321.backend.Repository.rolesRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class rolesServices {
    @Autowired
    rolesRepository rolesRepository;
    public rolesEntity insertRole(rolesEntity role){
        return rolesRepository.save(role);
    }
    public List<rolesEntity> getAllRoleEntities(){
        return rolesRepository.findAll();
    }
    @SuppressWarnings("finally")
    public rolesEntity updateRole(int rid,rolesEntity newRolesEntity){
        rolesEntity role = new rolesEntity();
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
        Optional<rolesEntity> optionalRole = rolesRepository.findById(rid);
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
