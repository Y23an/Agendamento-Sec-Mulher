package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.Mulher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;
public interface MulherRepository extends JpaRepository<Mulher, UUID> {
    Optional<Mulher> findByCpf(String cpf);
}
