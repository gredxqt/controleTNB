package ma.emsi.transactions.services;

import ma.emsi.transactions.entities.Transaction;
import ma.emsi.transactions.repositories.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        // Perform any additional validation/business logic here before saving
        return transactionRepository.save(transaction);
    }

    public Transaction getTransactionById(int id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Transactional
    public Transaction updateTransaction(int id, Transaction updatedTransaction) {
        Transaction existingTransaction = getTransactionById(id);

        // Perform any additional validation/business logic here before updating
        existingTransaction.setAmount(updatedTransaction.getAmount());
        existingTransaction.setType(updatedTransaction.isType());
        existingTransaction.setDate(updatedTransaction.getDate());
        existingTransaction.setAccount(updatedTransaction.getAccount());
        existingTransaction.setCategory(updatedTransaction.getCategory());

        return transactionRepository.save(existingTransaction);
    }

    @Transactional
    public void deleteTransaction(int id) {
        Transaction transaction = getTransactionById(id);
        transactionRepository.delete(transaction);
    }
}
