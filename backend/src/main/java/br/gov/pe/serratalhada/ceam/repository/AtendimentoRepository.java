package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;
public interface AtendimentoRepository extends JpaRepository<Atendimento, UUID> {
    List<Atendimento> findByMulherId(UUID mulherId);
}
