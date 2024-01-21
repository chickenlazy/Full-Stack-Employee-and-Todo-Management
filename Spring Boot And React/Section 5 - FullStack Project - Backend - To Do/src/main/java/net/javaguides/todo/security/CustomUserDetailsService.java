package net.javaguides.todo.security;

import lombok.AllArgsConstructor;
import net.javaguides.todo.entity.User;
import net.javaguides.todo.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail) //findByEmailContainingOrUsernameContaining
                .orElseThrow(() -> new UsernameNotFoundException("User not exists by Username or Email"));

        Set<GrantedAuthority> authorities //Tạo một tập hợp chứa các GrantedAuthority (quyền) dựa trên vai trò của người dùng
                = user.getRoles().stream() //Sử dụng Stream API để chuyển đổi từ Set<Role> sang Set<GrantedAuthority>
                .map((role) -> new SimpleGrantedAuthority(role.getName())) //Mỗi Role được chuyển đổi thành một SimpleGrantedAuthority với tên là role.getName()
                .collect(Collectors.toSet());

        return new
                org.springframework.security.core.userdetails.User( //Tạo ra một đối tượng UserDetails với thông tin về người dùng.
                usernameOrEmail,
                //null,
                user.getPassword(),
                authorities //Danh sách các quyền của người dùng
        ) ;
    }


}
