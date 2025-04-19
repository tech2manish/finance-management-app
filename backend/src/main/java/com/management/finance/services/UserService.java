package com.management.finance.services;

import com.management.finance.models.User;
import com.management.finance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;

    public User createUser(String email,String name, double income) {
        Optional<User> savedUser = userRepo.findByEmail(email);
        if(savedUser.isPresent()){
            return savedUser.get();
        }
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setIncome(income);
        user.setBalance(income); // ✅ Set initial balance from income
        return userRepo.save(user);
    }

    public Optional<User> getUser(Long userId) {
        return userRepo.findById(userId);
    }
}
