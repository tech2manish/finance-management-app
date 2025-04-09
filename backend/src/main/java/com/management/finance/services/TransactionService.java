package com.management.finance.services;

import com.management.finance.models.Transaction;
import com.management.finance.models.User;
import com.management.finance.repositories.TransactionRepository;
import com.management.finance.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepo;
    private final UserRepository userRepository;

    public Transaction addTransaction(Long userId, String type, double amount, String category) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (type.equalsIgnoreCase("expense")) {
            user.setBalance(user.getBalance() - amount); // Deduct from balance
        } else if (type.equalsIgnoreCase("income")) {
            user.setBalance(user.getBalance() + amount); // Add to balance
        }

        userRepository.save(user);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setCategory(category);
        transaction.setDate(LocalDateTime.now());

        return transactionRepo.save(transaction);
    }


    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepo.findByUserId(userId);
    }

    public Map<String, Double> getSummary(Long userId) {
        List<Transaction> transactions = getUserTransactions(userId);
        double income = 0, expense = 0;

        for (Transaction t : transactions) {
            if (t.getType().equalsIgnoreCase("income")) income += t.getAmount();
            else expense += t.getAmount();
        }

        double balance = income - expense;

        Map<String, Double> summary = new HashMap<>();
        summary.put("income", income);
        summary.put("expense", expense);
        summary.put("balance", balance);

        return summary;
    }
}
