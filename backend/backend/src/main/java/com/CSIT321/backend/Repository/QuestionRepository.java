package com.CSIT321.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.CSIT321.backend.Entity.QuestionEntity;

public interface QuestionRepository extends JpaRepository<QuestionEntity,Integer>{
        Optional<QuestionEntity> findById(int questionId);

}
