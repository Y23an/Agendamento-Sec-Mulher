package br.gov.pe.serratalhada.ceam.repository;
import br.gov.pe.serratalhada.ceam.domain.entity.Bairro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BairroRepository extends JpaRepository<Bairro, Long> {
    List<Bairro> findByAtivoTrueOrderByDescricaoAsc();
    List<Bairro> findAllByOrderByDescricaoAsc();
}
