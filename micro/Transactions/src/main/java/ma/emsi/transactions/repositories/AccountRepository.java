package ma.emsi.transactions.repositories;

import ma.emsi.transactions.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {

}
