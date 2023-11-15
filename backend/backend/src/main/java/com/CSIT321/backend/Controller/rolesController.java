package com.CSIT321.backend.Controller;
import com.CSIT321.backend.Entity.rolesEntity;
import com.CSIT321.backend.Service.rolesServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/roles")
public class rolesController {
    @Autowired
    rolesServices rolesServices;


    @PostMapping("/insertRoles")
    public rolesEntity insertRoles(@RequestBody rolesEntity role){
        return rolesServices.insertRole(role);
    }
    @GetMapping("/getAllRoles")
    public List<rolesEntity> getAllRoles(){
        return rolesServices.getAllRoleEntities();
    }
    @PutMapping("/updateRoles/{role_id}")
    public rolesEntity updateRoles(@PathVariable int role_id,@RequestBody rolesEntity newRolesEntity){
        return rolesServices.updateRole(role_id, newRolesEntity);
    }
    @DeleteMapping("/deleteRoles")
    public String deleteRoles(@PathVariable int role_id){
        return rolesServices.deleteRole(role_id);
    }
}
