package ma.emsi.categories.repositories;

import ma.emsi.categories.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
