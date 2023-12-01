package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.RolesEntity;
import com.CSIT321.backend.Service.RolesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/roles")
public class RolesController {
   
  
    @Autowired
    RolesServices rolesServices;
    
    @CrossOrigin
    @PostMapping("/insertRoles")
    public RolesEntity insertRoles(@RequestBody RolesEntity role){
        return rolesServices.insertRole(role);
        
    }
    @CrossOrigin
    @GetMapping("/getAllRoles")
    public List<RolesEntity> getAllRoles(){
        return rolesServices.getAllRoleEntities();
    }
    @CrossOrigin
    @PutMapping("/updateRoles/{role_id}")
    public RolesEntity updateRoles(@PathVariable int role_id,@RequestBody RolesEntity newRolesEntity){
        return rolesServices.updateRole(role_id, newRolesEntity);
    }
    @CrossOrigin
    @DeleteMapping("/deleteRoles")
    public String deleteRoles(@PathVariable int role_id){
        return rolesServices.deleteRole(role_id);
    }
}
