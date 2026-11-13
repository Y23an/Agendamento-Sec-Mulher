package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.VinculoAgressor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface VinculoAgressorRepository extends JpaRepository<VinculoAgressor, Long> {
    List<VinculoAgressor> findByAtivoTrueOrderByDescricaoAsc();
    List<VinculoAgressor> findAllByOrderByDescricaoAsc();
}
