package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.TipoViolencia;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TipoViolenciaRepository extends JpaRepository<TipoViolencia, Long> {
    List<TipoViolencia> findByAtivoTrueOrderByDescricaoAsc();
    List<TipoViolencia> findAllByOrderByDescricaoAsc();
}
