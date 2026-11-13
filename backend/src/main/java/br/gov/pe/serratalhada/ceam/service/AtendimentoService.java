package br.gov.pe.serratalhada.ceam.service;

import br.gov.pe.serratalhada.ceam.domain.entity.Atendimento;
import br.gov.pe.serratalhada.ceam.domain.entity.TipoViolencia;
import br.gov.pe.serratalhada.ceam.repository.AtendimentoRepository;
import br.gov.pe.serratalhada.ceam.repository.TipoViolenciaRepository;
import br.gov.pe.serratalhada.ceam.repository.VinculoAgressorRepository;
import br.gov.pe.serratalhada.ceam.web.dto.AtendimentoRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AtendimentoService {

    private final AtendimentoRepository atendimentoRepository;
    private final MulherService mulherService;
    private final VinculoAgressorRepository vinculoAgressorRepository;
    private final TipoViolenciaRepository tipoViolenciaRepository;

    public AtendimentoService(
            AtendimentoRepository atendimentoRepository,
            MulherService mulherService,
            VinculoAgressorRepository vinculoAgressorRepository,
            TipoViolenciaRepository tipoViolenciaRepository) {
        this.atendimentoRepository = atendimentoRepository;
        this.mulherService = mulherService;
        this.vinculoAgressorRepository = vinculoAgressorRepository;
        this.tipoViolenciaRepository = tipoViolenciaRepository;
    }

    @Transactional
    public Atendimento registrarAtendimento(AtendimentoRequest request) {
        Atendimento atendimento = new Atendimento();
        atendimento.setMulher(mulherService.buscarPorId(request.mulherId()));
        atendimento.setRelatoVitima(request.relatoVitima());
        atendimento.setProvidenciasTomadas(request.providenciasTomadas());
        atendimento.setTipoAtendimento(
                request.tipoAtendimento() != null && !request.tipoAtendimento().isBlank()
                        ? request.tipoAtendimento()
                        : "Psicológico"
        );
        atendimento.setProtocolo(gerarProtocolo());

        if (request.vinculoAgressorId() != null) {
            vinculoAgressorRepository.findById(request.vinculoAgressorId())
                    .ifPresent(atendimento::setVinculoAgressor);
        }

        if (request.tiposViolenciaIds() != null && !request.tiposViolenciaIds().isEmpty()) {
            List<TipoViolencia> violencias = tipoViolenciaRepository.findAllById(request.tiposViolenciaIds());
            atendimento.setTiposViolencia(violencias);
        }

        return atendimentoRepository.save(atendimento);
    }

    @Transactional(readOnly = true)
    public List<Atendimento> listarTodos() {
        return atendimentoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Atendimento> listarPorMulher(UUID mulherId) {
        return atendimentoRepository.findByMulherId(mulherId);
    }

    private String gerarProtocolo() {
        int anoCorrente = LocalDateTime.now().getYear();
        long count = atendimentoRepository.count() + 1;
        return anoCorrente + "-" + String.format("%06d", count);
    }
}
