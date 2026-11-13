package br.gov.pe.serratalhada.ceam.web.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

public record AtendimentoRequest(
    @NotNull UUID mulherId,
    String relatoVitima,
    String providenciasTomadas,
    String tipoAtendimento,
    Long vinculoAgressorId,
    List<Long> tiposViolenciaIds
) {}
