package ma.emsi.transactions.services;


import ma.emsi.transactions.entities.Category;
import ma.emsi.transactions.repositories.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public Category createCategory(Category category) {
        // Perform any additional validation/business logic here before saving
        return categoryRepository.save(category);
    }

    public Category getCategoryById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category updateCategory(int id, Category updatedCategory) {
        Category existingCategory = getCategoryById(id);

        // Perform any additional validation/business logic here before updating
        existingCategory.setName(updatedCategory.getName());
        existingCategory.setColor(updatedCategory.getColor());

        return categoryRepository.save(existingCategory);
    }

    @Transactional
    public void deleteCategory(int id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
    }
}
