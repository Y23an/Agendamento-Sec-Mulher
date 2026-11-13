package br.gov.pe.serratalhada.ceam.repository;

import br.gov.pe.serratalhada.ceam.domain.entity.Usuario;
import br.gov.pe.serratalhada.ceam.domain.enums.RoleUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    Optional<Usuario> findByEmailAndAtivoTrue(String email);
    Optional<Usuario> findByEmailIgnoreCaseAndAtivoTrue(String email);
    boolean existsByRole(RoleUsuario role);
}
