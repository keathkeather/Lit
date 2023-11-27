package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.CSIT321.backend.Entity.AccountEntity;
import com.CSIT321.backend.Entity.AccountSubscriptionEntity;

public interface AccountSubscriptionRepository extends JpaRepository<AccountSubscriptionEntity, Integer> {
     boolean existsByAccount(AccountEntity account);
     List<AccountSubscriptionEntity> findByAccount(AccountEntity account);
}
