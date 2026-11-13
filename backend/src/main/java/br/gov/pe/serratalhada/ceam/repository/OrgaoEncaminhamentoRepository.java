package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.OrgaoEncaminhamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OrgaoEncaminhamentoRepository extends JpaRepository<OrgaoEncaminhamento, Long> {
    List<OrgaoEncaminhamento> findByAtivoTrueOrderByDescricaoAsc();
    List<OrgaoEncaminhamento> findAllByOrderByDescricaoAsc();
}
