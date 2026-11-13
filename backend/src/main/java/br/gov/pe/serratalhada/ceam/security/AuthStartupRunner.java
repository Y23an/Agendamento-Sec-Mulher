package br.gov.pe.serratalhada.ceam.security;

import br.gov.pe.serratalhada.ceam.domain.entity.Usuario;
import br.gov.pe.serratalhada.ceam.domain.enums.RoleUsuario;
import br.gov.pe.serratalhada.ceam.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AuthStartupRunner implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(AuthStartupRunner.class);

    private final UsuarioRepository repo;
    private final PasswordEncoder encoder;
    private final String adminEmail;
    private final String adminSenha;

    public AuthStartupRunner(UsuarioRepository repo, PasswordEncoder encoder,
                             @Value("${ADMIN_EMAIL:}") String adminEmail,
                             @Value("${ADMIN_PASSWORD:}") String adminSenha) {
        this.repo = repo; this.encoder = encoder;
        this.adminEmail = adminEmail; this.adminSenha = adminSenha;
    }

    @Override
    @Transactional
    public void run(String... args) {
        int migradas = 0;
        for (Usuario u : repo.findAll()) {
            String s = u.getSenha();
            if (s != null && !s.startsWith("$2")) {   // ainda não é hash BCrypt
                u.setSenha(encoder.encode(s));
                repo.save(u);
                migradas++;
            }
        }
        if (migradas > 0) {
            log.warn("{} senha(s) em texto puro convertidas para BCrypt. Remova as senhas do data.sql!", migradas);
        }

        if (!repo.existsByRole(RoleUsuario.ADMIN) && !adminEmail.isBlank() && adminSenha.length() >= 8) {
            var u = new Usuario();
            u.setNome("Administrador");
            u.setEmail(adminEmail.trim().toLowerCase());
            u.setSenha(encoder.encode(adminSenha));
            u.setRole(RoleUsuario.ADMIN);
            u.setAtivo(true);
            repo.save(u);
            log.info("Usuário ADMIN inicial criado: {}", u.getEmail());
        }
    }
}
