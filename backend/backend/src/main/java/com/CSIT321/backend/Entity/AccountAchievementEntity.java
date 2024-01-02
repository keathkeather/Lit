package com.CSIT321.backend.Entity;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "accountAchievement")
public class AccountAchievementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountAchievementId;

    @OneToOne(cascade = {CascadeType.ALL, CascadeType.PERSIST})
    @JsonBackReference
    @JoinColumn(name = "account_id")
    private AccountEntity account;

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "account_achievement_id")
    private List<AchievementEntity> achievements  = new ArrayList<>(); ;
    
    @Builder.Default
    public boolean isDeleted = false;


    public void addAchievement(AchievementEntity achievement) {
        if (achievement != null) {
            achievements.add(achievement);
            
        }
    }

    public void removeAchievement(AchievementEntity achievement) {
        if (achievement != null) {
            achievements.remove(achievement);
      
        }
    }
}
