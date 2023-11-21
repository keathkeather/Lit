package com.CSIT321.backend.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountEntity;
public interface AccountRepository extends JpaRepository<AccountEntity, Integer>{
        Optional<AccountEntity> findById(int accountId);

}
