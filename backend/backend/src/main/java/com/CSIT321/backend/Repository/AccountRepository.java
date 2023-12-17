package com.CSIT321.backend.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CSIT321.backend.Entity.AccountEntity;
import java.util.List;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer>{
        Optional<AccountEntity> findById(int accountId);
        Optional<List<AccountEntity>>  findByRole(int roleId);
}
