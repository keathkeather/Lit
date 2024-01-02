package com.CSIT321.backend.Entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="achievement")
public class AchievementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int achievementId;

    @ManyToOne
    private BookEntity book;
    
    @Column(name = "achievementName")
    private String achievementName;

    @Column(name = "achievementDescription")
    private String achievementDescription;

    @Column(name = "achievementValue")
    private int achievementValue;
    


    @Builder.Default
    private Boolean isDeleted = false;
    
 
  

}
