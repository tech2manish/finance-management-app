package com.management.finance.controllers;

import com.management.finance.models.Transaction;
import com.management.finance.models.User;
import com.management.finance.repositories.UserRepository;
import com.management.finance.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<Transaction> addTransaction(
            @RequestParam Long userId,
            @RequestParam String type,
            @RequestParam double amount,
            @RequestParam String category) {
        return ResponseEntity.ok(transactionService.addTransaction(userId, type, amount, category));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
    }

    @GetMapping("/summary/{userId}")
    public ResponseEntity<Map<String, Double>> getSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getSummary(userId));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/balance/{userId}")
    public ResponseEntity<Double> getBalance(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user.getBalance());
    }
}
