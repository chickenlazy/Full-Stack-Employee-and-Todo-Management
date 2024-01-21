package net.javaguides.todo.repository;

import net.javaguides.todo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameContaining(String infix);
    Optional<User> findByEmailContainingOrUsernameContaining(String emailInfix, String usernameInfix);
    boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameOrEmail (String username, String email);
    boolean existsByUsername(String username);

}
