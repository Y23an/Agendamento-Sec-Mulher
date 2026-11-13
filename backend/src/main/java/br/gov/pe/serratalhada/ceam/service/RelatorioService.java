package br.gov.pe.serratalhada.ceam.service;

import br.gov.pe.serratalhada.ceam.domain.entity.Atendimento;
import br.gov.pe.serratalhada.ceam.domain.enums.StatusAtendimento;
import br.gov.pe.serratalhada.ceam.repository.AtendimentoRepository;
import br.gov.pe.serratalhada.ceam.repository.MulherRepository;
import br.gov.pe.serratalhada.ceam.web.dto.MetricasResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    private final MulherRepository mulherRepository;
    private final AtendimentoRepository atendimentoRepository;

    public RelatorioService(MulherRepository mulherRepository, AtendimentoRepository atendimentoRepository) {
        this.mulherRepository = mulherRepository;
        this.atendimentoRepository = atendimentoRepository;
    }

    @Transactional(readOnly = true)
    public MetricasResponse obterMetricas() {
        long totalMulheres = mulherRepository.count();
        List<Atendimento> todosAtendimentos = atendimentoRepository.findAll();
        long totalAtendimentos = todosAtendimentos.size();

        long totalEmAcompanhamento = todosAtendimentos.stream()
                .filter(a -> a.getStatus() == StatusAtendimento.EM_ACOMPANHAMENTO)
                .count();

        long totalEncerrados = todosAtendimentos.stream()
                .filter(a -> a.getStatus() == StatusAtendimento.ENCERRADO)
                .count();

        // Agrupamento por Tipo de Atendimento (ex: Psicológico, Social, Jurídico)
        Map<String, Long> porTipo = new LinkedHashMap<>();
        porTipo.put("Psicológico", 0L);
        porTipo.put("Social", 0L);
        porTipo.put("Jurídico", 0L);

        todosAtendimentos.stream()
                .map(a -> a.getTipoAtendimento() != null ? a.getTipoAtendimento() : "Social")
                .forEach(tipo -> porTipo.merge(tipo, 1L, Long::sum));

        // Agrupamento por Status
        Map<String, Long> porStatus = new LinkedHashMap<>();
        porStatus.put("ABERTO", 0L);
        porStatus.put("EM_ACOMPANHAMENTO", 0L);
        porStatus.put("ENCERRADO", 0L);

        todosAtendimentos.forEach(a -> {
            String status = a.getStatus() != null ? a.getStatus().name() : "ABERTO";
            porStatus.merge(status, 1L, Long::sum);
        });

        // Agrupamento por Bairro da Mulher
        Map<String, Long> porBairro = todosAtendimentos.stream()
                .filter(a -> a.getMulher() != null && a.getMulher().getBairro() != null)
                .collect(Collectors.groupingBy(
                        a -> a.getMulher().getBairro().getDescricao(),
                        Collectors.counting()
                ));

        return new MetricasResponse(
                totalMulheres,
                totalAtendimentos,
                totalEmAcompanhamento,
                totalEncerrados,
                porTipo,
                porStatus,
                porBairro
        );
    }
}
