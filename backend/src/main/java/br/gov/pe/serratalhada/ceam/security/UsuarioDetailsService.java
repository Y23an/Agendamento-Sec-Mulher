package br.gov.pe.serratalhada.ceam.security;

import br.gov.pe.serratalhada.ceam.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsService implements UserDetailsService {
    private final UsuarioRepository repo;

    public UsuarioDetailsService(UsuarioRepository repo) { this.repo = repo; }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repo.findByEmailIgnoreCaseAndAtivoTrue(email.trim())
                .orElseThrow(() -> new UsernameNotFoundException("Credenciais inválidas"));
    }
}
