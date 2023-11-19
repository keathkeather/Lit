package com.CSIT321.backend.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CSIT321.backend.Entity.QuizEntity;

public interface QuizRepository extends JpaRepository<QuizEntity, Integer> {
            Optional<QuizEntity> findById(int quizId);

}