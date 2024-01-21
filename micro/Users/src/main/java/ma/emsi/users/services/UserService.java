package ma.emsi.users.services;

import ma.emsi.users.entities.User;
import ma.emsi.users.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(User user) {
        // Perform any additional validation/business logic here before saving
        return userRepository.save(user);
    }

    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User updateUser(int id, User updatedUser) {
        User existingUser = getUserById(id);

        // Perform any additional validation/business logic here before updating
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setAmount(updatedUser.getAmount());
        existingUser.setDateSalary(updatedUser.getDateSalary());
        existingUser.setSalary(updatedUser.getSalary());
        existingUser.setAccounts(updatedUser.getAccounts());

        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUser(int id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
