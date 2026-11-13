package br.gov.pe.serratalhada.ceam.repository;

import br.gov.pe.serratalhada.ceam.domain.entity.TipoAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoAtendimentoRepository extends JpaRepository<TipoAtendimento, Long> {
    List<TipoAtendimento> findByAtivoTrueOrderByDescricaoAsc();
    List<TipoAtendimento> findAllByOrderByDescricaoAsc();
}
