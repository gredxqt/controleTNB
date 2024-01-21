package ma.emsi.transactions.repositories;


import ma.emsi.transactions.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
