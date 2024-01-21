package ma.emsi.transactions.services;

import ma.emsi.transactions.entities.Account;
import ma.emsi.transactions.repositories.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    public Account createAccount(Account account) {
        // Perform any additional validation/business logic here before saving
        return accountRepository.save(account);
    }

    public Account getAccountById(int accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
    }


    @Transactional
    public Account updateAccount(int accountId, Account updatedAccount) {
        Account existingAccount = getAccountById(accountId);

        // Perform any additional validation/business logic here before updating
        existingAccount.setName(updatedAccount.getName());
        existingAccount.setBalance(updatedAccount.getBalance());

        return accountRepository.save(existingAccount);
    }

    @Transactional
    public void deleteAccount(int accountId) {
        Account account = getAccountById(accountId);
        accountRepository.delete(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }
}
