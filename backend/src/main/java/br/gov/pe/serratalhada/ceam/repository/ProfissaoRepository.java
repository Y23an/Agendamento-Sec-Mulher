package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.Profissao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ProfissaoRepository extends JpaRepository<Profissao, Long> {
    List<Profissao> findByAtivoTrueOrderByDescricaoAsc();
    List<Profissao> findAllByOrderByDescricaoAsc();
}
