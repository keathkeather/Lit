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

import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "accountAchievement")
public class AccountAchievementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountAchievementId;

    @OneToOne(cascade = {CascadeType.ALL, CascadeType.PERSIST})
    @JsonBackReference
    @JoinColumn(name = "account_id")
    private AccountEntity account;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "account_achievement_id")
    private List<AchievementEntity> achievements;

    public boolean isDeleted;

    public AccountAchievementEntity() {
        super();
        this.isDeleted = false;
    }

    public AccountAchievementEntity(AccountEntity account) {
        this.account = account;
        this.achievements = new ArrayList<>(); // Initialize the achievements field
        this.isDeleted = false;
    }

    public AccountAchievementEntity(AccountEntity account, List<AchievementEntity> achievements) {
        this.account = account;
        this.achievements = achievements;
        this.isDeleted = false;
    }

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

    public int getAccountAchievementId() {
        return this.accountAchievementId;
    }

    public AccountEntity getAccount() {
        return this.account;
    }

    public List<AchievementEntity> getAchievements() {
        return this.achievements;
    }

    public boolean getIsDeleted() {
        return this.isDeleted;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public void setAchievements(List<AchievementEntity> achievements) {
        this.achievements = achievements;
    }

    public void delete() {
        this.isDeleted = true;
    }

    public void restore() {
        this.isDeleted = false;
    }
}
