package ma.emsi.transactions.repositories;

import ma.emsi.transactions.entities.TNB;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TnbRepository extends JpaRepository<TNB, Integer> {
}
